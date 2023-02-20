/*
 * @Author: Lee
 * @Date: 2022-06-19 14:15:04
 * @LastEditors: Lee
 * @LastEditTime: 2022-10-19 18:23:21
 * @Description: 富文本编辑器
 */
import React, { memo, useState, useEffect, useImperativeHandle } from 'react';
import '@wangeditor/editor/dist/css/style.css';
import '@/components/@lgs/EditorWang/menus';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { SlateTransforms } from '@wangeditor/editor';
import toolbarKeys from './configs/toolbarKeys';
import hoverbarKeys from './configs/hoverbarKeys';
import { fontSize } from './configs/menuConfs';
import EventNames from './constants/eventNames';
import { message, Modal } from 'antd';
import './index.less';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  width?: number;
  placeholder?: string;
  onPreview?: (htmlString: string) => void;
  onUploadImage?: (file: File, next: (url: string) => void) => void;
}
export interface EditorWangRefs {
  /** 设置内容 */
  setContent: (htmlString: string) => void;
}

type InsertFnType = (url: string, alt: string, href: string) => void;
const EditorWang = React.forwardRef<EditorWangRefs, IProps>((props, refs) => {
  // --
  const {
    value,
    placeholder = '请输入内容',
    width = 480,
    onChange,
    onPreview,
    onUploadImage,
  } = props;
  // -- state
  const [instance, setInstance] = useState<IDomEditor | null>(null);
  useImperativeHandle(refs, () => ({
    setContent: (htmlString: string) => {
      console.log(htmlString);
    },
  }));

  // -- events
  const __onClearContent = (editor: IDomEditor) => {
    Modal.confirm({
      title: '是否确定清空内容?',
      content: '清空后内容将无法恢复，请自行保存内容!',
      onOk: () => editor.clear(),
    });
  };
  const __onPreview = (editor: IDomEditor) => {
    if (!editor.getText()) {
      message.info('文本内容为空，无法预览');
      return;
    }
    if (onPreview) {
      onPreview(editor.getHtml());
    }
  };
  const __onReplaceImage = (editor: IDomEditor, file: File) => {
    if (onUploadImage) {
      onUploadImage(file, (url: string) => {
        // -- 移除当前选中的节点
        SlateTransforms.removeNodes(editor);
        // -- 插入新节点
        const node = {
          type: 'paragraph',
          children: [
            { text: '' },
            {
              type: 'image',
              src: url,
              href: 'href',
              alt: 'alt',
              style: {},
              children: [{ text: '' }],
            },
            { text: '' },
          ],
        };
        editor.insertNode(node);
      });
    }
  };

  // -- 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys,
  };

  // -- 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder /** 占位符 */,
    hoverbarKeys /** 悬浮菜单 */,
    MENU_CONF: {
      fontSize,
      uploadImage: {
        // 自定义上传
        async customUpload(file: File, insertFn: InsertFnType) {
          if (onUploadImage) {
            onUploadImage(file, (url: string) => {
              insertFn(url, 'alt', 'href');
            });
          }
        },
      },
    },
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (instance == null) return;
      instance.destroy();
      setInstance(null);
    };
  }, [instance]);

  // -- render
  return (
    <div style={{ border: '1px solid #ccc', width }}>
      {/* 工具栏 */}
      <Toolbar
        editor={instance}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #ccc' }}
      />
      {/* 编辑器 */}
      <Editor
        defaultConfig={editorConfig}
        // value={}
        onCreated={(editor: IDomEditor) => {
          setInstance(editor);
          const h = `<section style="background: url('https://ttmini.yizhiwechat.com/ketang/temps/temp6/1.png') center top / 100% no-repeat #ffe4e0; padding: 24px 0px 1px;">
          <h1 style="background: linear-gradient(90deg, #FF6C57 0%, #E52F1F 100%); box-shadow: 0 2px 5px 0 rgba(225, 0, 0, 0.4); border-radius: 0 20px 20px 20px; text-align: center; font-size: 20px; font-weight: bold; color: #ffffff; float: left; padding: 6px 30px 6px 10px; min-width: 120px; margin: 0 0 16px 30px;">老师介绍</h1>
          <div style="clear: left; padding: 0 20px 0 30px;">
          <div style="color: #810000; font-size: 18px; font-weight: bold; margin-bottom: 12px;">卢鸶</div>
          <div style="font-size: 15px; font-weight: 500; color: #810000; margin-bottom: 2px;">资深英语讲师</div>
          <div style="font-size: 15px; font-weight: 500; color: #810000; margin-bottom: 2px;">广播台英语频道主播</div>
          <div style="font-size: 15px; font-weight: 500; color: #810000; margin-bottom: 2px;">教材编写委员</div>
          <div style="font-size: 15px; font-weight: 500; color: #810000; margin-bottom: 2px;">雅思高分记录保持者</div>
          <div style="font-size: 15px; font-weight: 500; color: #810000; margin-bottom: 2px;">全国英语演讲总决赛评委</div>
          <div style="font-size: 15px; font-weight: 500; color: #810000; margin-bottom: 2px;">英语词典主编兼资深顾问团团长</div>
          </div>
          <div>&nbsp;</div>
          <div style="font-size: 20px; color: #ffffff; font-weight: bold; background: linear-gradient(90deg, #FF8E79 0%, #FF3E19 100%); border-radius: 0 0 0 10px; position: relative; margin: 10px 0 15px 16px; padding: 7px 20px 7px 36px;">
          <div style="width: 30px; height: 30px; line-height: 32px; font-size: 18px; font-weight: bold; text-align: center; position: absolute; left: 0; top: 0; transform: translate(-30%,-30%); background: linear-gradient(135deg, #FFB302 0%, #FF9701 100%); box-shadow: 0 1px 3px 0 rgba(255, 21, 0, 0.4); border-radius: 3px;">01</div>
          课程介绍</div>
          <div style="background: #ffffff; padding: 16px 15px; margin: 0 16px; border-radius: 10px; box-shadow: 0 1px 20px 0 rgba(255, 174, 159, 0.4);">
          <h2 style="background: linear-gradient(90deg, #FFB449 0%, #FF7200 100%); box-shadow: 0 1px 5px 0 rgba(255, 189, 0, 0.6); border-radius: 3px 0 20px 3px; font-size: 18px; font-weight: 500; color: #ffffff; float: left; padding: 6px 30px 6px 15px; margin: 0 0 15px; min-width: 100px;">课程大纲</h2>
          <div style="clear: left; height: 0;">&nbsp;</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">发音重要吗？该学K音标吗？还是自然拼读？</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">如何打破哑巴式英语？</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">中国人讲英语容易犯的六大误区</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">听力提高方法论</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">口语提高方法论</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">互联网时候，如何巧用网上资源学口语</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">如何花式打招呼</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">如何优雅的介绍彼此</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">怎么开心怎么说</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">用20句话说我爱你</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">聚会上还怎么聊天</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">生病时怎么说最明白</div>
          <h2 style="background: linear-gradient(90deg, #FFB449 0%, #FF7200 100%); box-shadow: 0 1px 5px 0 rgba(255, 189, 0, 0.6); border-radius: 3px 0 20px 3px; font-size: 18px; font-weight: 500; color: #ffffff; float: left; padding: 6px 30px 6px 15px; margin: 12px 0 15px; min-width: 100px;">课程亮点</h2>
          <div style="clear: left; height: 0;">&nbsp;</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">所讲内容,是母语为英语的外国人日常生活中经常说的，符合英美现实生活,纯正地道不过时。</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">将全部句子融入每一个场景，环环相扣，节节相连,并且针对实际需要，真正用得上而且又应急。</div>
          <div style="margin-bottom: 4px; padding: 0 0 0 5px;">全程幽默风趣的教学风格一点也不枯燥，并根据中国人学习英语口语的特点,循序渐进,让你说的更标准。</div>
          </div>
          <div>&nbsp;</div>
          <div style="font-size: 20px; color: #ffffff; font-weight: bold; background: linear-gradient(90deg, #FF8E79 0%, #FF3E19 100%); border-radius: 0 0 0 10px; position: relative; margin: 10px 0 15px 16px; padding: 7px 20px 7px 36px;">
          <div style="width: 30px; height: 30px; line-height: 32px; font-size: 18px; font-weight: bold; text-align: center; position: absolute; left: 0; top: 0; transform: translate(-30%,-30%); background: linear-gradient(135deg, #FFB302 0%, #FF9701 100%); box-shadow: 0 1px 3px 0 rgba(255, 21, 0, 0.4); border-radius: 3px;">02</div>
          面向人群</div>
          <div style="background: #ffffff; padding: 18px 15px 10px; margin: 0 16px; border-radius: 10px; box-shadow: 0 1px 20px 0 rgba(255, 174, 159, 0.4);">
          <div style="color: #383b3a; margin-bottom: 6px; padding: 0 0 0 5px;">零基础学员，可以学会地道的英语口语少走弯道。</div>
          <div style="color: #383b3a; margin-bottom: 6px; padding: 0 0 0 5px;">基础不扎实学员，可以巩固口语基础，让你更流利说。</div>
          <div style="color: #383b3a; margin-bottom: 6px; padding: 0 0 0 5px;">基础一般学员,可以查漏补缺，及时纠正让你一开口正宗。</div>
          <div style="color: #383b3a; margin-bottom: 6px; padding: 0 0 0 5px;">基础好的学员，可以运用口语方法融会贯通，提升实力。</div>
          </div>
          <div>&nbsp;</div>
          <div style="font-size: 20px; color: #ffffff; font-weight: bold; background: linear-gradient(90deg, #FF8E79 0%, #FF3E19 100%); border-radius: 0 0 0 10px; position: relative; margin: 10px 0 15px 16px; padding: 7px 20px 7px 36px;">
          <div style="width: 30px; height: 30px; line-height: 32px; font-size: 18px; font-weight: bold; text-align: center; position: absolute; left: 0; top: 0; transform: translate(-30%,-30%); background: linear-gradient(135deg, #FFB302 0%, #FF9701 100%); box-shadow: 0 1px 3px 0 rgba(255, 21, 0, 0.4); border-radius: 3px;">03</div>
          学完收获</div>
          <div style="background: #ffffff; padding: 18px 15px 10px; margin: 0 16px; border-radius: 10px; box-shadow: 0 1px 20px 0 rgba(255, 174, 159, 0.4);">
          <div style="color: #383b3a; margin-bottom: 6px; padding: 0 0 0 5px;">学英语最终目的不仅要告别哑巴英语，更要在实际中能够用的上。</div>
          <div style="color: #383b3a; margin-bottom: 6px; padding: 0 0 0 5px;">实用场景英语口语教学，给你语境、教你口语、带你学习。</div>
          <div style="color: #383b3a; margin-bottom: 6px; padding: 0 0 0 5px;">每天坚持15分钟，让你真正会说、敢说、说对，让学英语像学汉语一样简单、纯正。</div>
          </div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          </section>`;
          editor.dangerouslyInsertHtml(h);
          // -- 自定义事件
          editor.on(EventNames.TAP_PREVIEW, () => __onPreview(editor));
          editor.on(EventNames.TAP_CLEAR_CONTENT, () => __onClearContent(editor));
          editor.on(EventNames.TAP_REPLACE_IMAGE, (file) => __onReplaceImage(editor, file));
        }}
        onChange={(_editor) => {
          const htmlString = _editor.getHtml();
          console.log(htmlString);
          // console.log(htmlString);
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          // onChange && onChange(htmlString);
        }}
        mode="default"
        style={{ height: '420px', overflowY: 'hidden' }}
      />
    </div>
  );
});

export default memo(EditorWang);
