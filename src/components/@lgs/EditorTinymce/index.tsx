/*
 * @Author: Lee
 * @Date: 2022-10-13 22:58:21
 * @LastEditors: Lee
 * @LastEditTime: 2022-11-08 14:47:24
 * @Description:
 */
import React, { memo, useImperativeHandle, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { message, Modal } from 'antd';
import './index.less';

interface IProps {
  /** apiKey */
  apiKey: string;
  /** 编辑器宽度 */
  width?: number;
  /** 编辑器高度 */
  height?: number;
  /** 占位符 */
  placeholder?: string;
  /** 拾取图片 */
  onPickerImage?: (file: File, next: (url: string) => void) => void;
  /** 预览内容 */
  onPreview?: (htmlString: string) => void;
  /** 内容改变 */
  onEditorChange: (htmlString: string) => void;
}

export interface EditorTinymceRefs {
  /** 设置内容 */
  setContent: (htmlString: string) => void;
}


const EditorTinymce = React.forwardRef<EditorTinymceRefs, IProps>((props, ref) => {
  // -- props
  const {
    apiKey,
    width = 570,
    height = 500,
    placeholder = '',
    onEditorChange,
    onPickerImage,
    onPreview,
  } = props;
  // -- state
  const [stage, setStage] = useState('');
  // -- refs
  const tinymce = useRef<any>(null);
  useImperativeHandle(ref, () => ({
    setContent: (htmlString: string) => {
      if (tinymce.current) {
        tinymce.current.setContent(htmlString);
      } else {
        setStage(htmlString);
      }
    },
  }));
  // - render
  return (
    // @ts-ignore
    <Editor
      apiKey={apiKey}
      onInit={(evt, editor) => {
        tinymce.current = editor;
        // if (stage) {
        //   editor.setContent(stage);
        // } else {
        //   editor.setContent(placeholder);
        // }
      }}
      initialValue={stage || placeholder}
      onEditorChange={onEditorChange}
      init={{
        width,
        height,
        menubar: false /** 是否显示菜单栏 */,
        language: 'zh-Hans' /** 语言（汉化） */,
        language_url: '/zh-Hans.js',
        branding: false /** 隐藏右下角的技术支持 */,
        elementpath: false /** 隐藏底栏的元素路径 */,
        quickbars_insert_toolbar: '' /** 【插入】快捷工具栏 */,
        quickbars_selection_toolbar:
          'bold italic | alignleft aligncenter alignright alignjustify' /** 【选择】快捷工具栏 */,
        plugins: [
          'quickbars', // 快捷工具栏
          'searchreplace', // 搜索替换
          'wordcount', // 统计字数
        ],
        toolbar: [
          'fontsize divider | forecolor backcolor | bold italic underline removeformat |  uploadimage ',
          'alignleft aligncenter alignright alignjustify | outdent indent | undo redo | searchreplace clear phonepreview ',
        ],
        editimage_toolbar: 'replaceimage',
        font_size_formats: '12px 14px 15px 16px 18px 20px 24px 28px 36px 42px 48px',
        toolbar_mode: 'floating', // 工具栏模式
        content_style: `body { 
          font-family:Helvetica,Arial,sans-serif; 
          font-size:16px; 
        }`,
        setup(editor) {
          // -- 事件相关
          /** 初始化时，设置自定义占位符 */
          editor.on('init', () => {
            if (editor.getContent() === '') {
              editor.setContent(placeholder);
            }
          });
          /** 获取焦点时，移除自定义占位符 */
          editor.on('focus', () => {
            (document.querySelector('.tox-tinymce iframe') as HTMLIFrameElement).contentDocument
              ?.querySelector('#customPlaceholder')
              ?.remove();
          });
          /** 失去焦点时，如果内容为空，再次填充自定义占位符 */
          editor.on('blur', () => {
            if (editor.getContent() === '') {
              editor.setContent(placeholder);
            }
          });

          // -- 自定义工具栏按钮
          /** 插入图片 */
          editor.ui.registry.addButton('uploadimage', {
            text: '插入图片',
            icon: 'image',
            onAction: () => {
              // -- 模拟点击，拾取图片·
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              input.click();
              input.onchange = function () {
                // @ts-ignore
                const file = this.files[0] as File;
                if (onPickerImage) {
                  onPickerImage(file, (url: string) => {
                    editor.insertContent(`<img width="100" src=${url} />`);
                  });
                }
              };
            },
          });
          /** 替换图片 */
          editor.ui.registry.addButton('replaceimage', {
            text: '替换图片',
            onAction: () => {
              // -- 模拟点击，拾取图片·
              // const input = document.createElement('input');
              // input.setAttribute('type', 'file');
              // input.setAttribute('accept', 'image/*');
              // input.click();
              // input.onchange = function () {
              //   // @ts-ignore
              //   const file = this.files[0] as File;
              //   if (onPickerImage) {
              //     onPickerImage(file, (url: string) => {
              //       editor.insertContent(`<img width="100" src=${url} />`);
              //     });
              //   }
              // };
            },
          });
          /** 清除内容 */
          editor.ui.registry.addButton('clear', {
            text: '清除内容',
            onAction: () => {
              Modal.confirm({
                title: '是否确定清空内容?',
                content: '清空后内容将无法恢复，请自行保存内容!',
                onOk: () => {
                  editor.setContent('');
                },
              });
            },
          });
          /** 手机预览 */
          editor.ui.registry.addButton('phonepreview', {
            text: '手机预览',
            onAction: () => {
              const htmlString = editor.getContent();
              if (!htmlString) {
                message.info('文本内容为空，无法预览');
                return;
              }
              if (onPreview) {
                onPreview(htmlString);
              }
            },
          });
        },
      }}
    />
  );
});

export default memo(EditorTinymce);
