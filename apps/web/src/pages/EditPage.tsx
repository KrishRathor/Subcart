import { Editor, Frame, Element } from "@craftjs/core";
import { UserButton } from "../components/editor/user/UserButton";
import { UserText } from "../components/editor/user/UserText";
import { UserContainer } from "../components/editor/user/UserContainer";
import { UserImage } from "../components/editor/user/UserImage";
import { ToolBox } from "../components/editor/ToolBox";
import { SettingsPanel } from "../components/editor/SettingPanel";
import { MinimalTest } from "../components/editor/user/MinimalTest";

export const EditPage = () => {

  console.log("hi", UserContainer, UserImage, UserButton, UserText);

  return (
    // Use flex row for the overall layout
    <div className="bg-gray-950 min-h-screen text-gray-300 flex flex-row">
      <Editor
        resolver={{
          'Container': UserContainer,
          UserText,
          UserButton,
          UserImage,
          MinimalTest
        }}
      >
        <div className="w-60 flex-shrink-0 h-screen overflow-y-auto p-4 border-r border-gray-800 bg-gray-900">
          <ToolBox />
        </div>

        <div className="flex-grow h-screen overflow-y-auto relative p-4 bg-gray-800/10">
          <div className="bg-white shadow-lg rounded-md h-full">
            <Frame>
              <Element is="div" canvas>
                <Element is={UserButton} text="Initial Text Test" />
              </Element>
            </Frame>
          </div>
        </div>

        <div className="w-72 flex-shrink-0 h-screen overflow-y-auto p-0 border-l border-gray-800 bg-gray-900"> {/* Removed padding */}
          <SettingsPanel />
        </div>
      </Editor>
    </div>
  );
};
