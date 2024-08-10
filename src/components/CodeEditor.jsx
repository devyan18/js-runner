import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import { useCode } from "../CodeProvider";

export const CodeEditor = () => {
  const { code, midifyCode } = useCode();

  return (
    <div className="col-start-1 row-start-2 row-span-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#282c34] scrollbar-track-[#1e2227] min-h-full">
      <AceEditor
        number
        width="100%"
        height="100%"
        tabSize={2}
        highlightActiveLine={true}
        mode="javascript"
        theme="one_dark"
        debounceChangePeriod={500}
        fontSize={16}
        value={code}
        onChange={midifyCode}
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={false}
        lineHeight={22}
        scrollMargin={0}
        setOptions={{
          displayIndentGuides: true,
          showLineNumbers: true,
          printMargin: false,
          showGutter: true,
          fontFamily: "Geist-Mono",
          showFoldWidgets: true,
        }}
      />
    </div>
  );
};
