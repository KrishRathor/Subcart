import { Editor, Frame, Element, Canvas } from "@craftjs/core";
import { UserButton } from "../components/editor/user/UserButton";
import { UserText } from "../components/editor/user/UserText";
import { Container } from "../components/editor/user/UserContainer";
import { UserImage } from "../components/editor/user/UserImage";
import { ToolBox } from "../components/editor/ToolBox";
import { SettingsPanel } from "../components/editor/SettingPanel";
import { MinimalTest } from "../components/editor/user/MinimalTest";
import { UserColumn } from "../components/editor/user/UserColumn";
import { UserBgImage } from "../components/editor/user/UserBgImage";
import { UserSection } from "../components/editor/user/UserSection";
import { UserGrid } from "../components/editor/user/UserGrid";
import { UserSpacer } from "../components/editor/user/UserSpace";
import { UserAccordion } from "../components/editor/user/UserAccordion";
import { UserAccordionItem } from "../components/editor/user/UserAccordionItem";
import { UserHeading } from "../components/editor/user/UserHeading";
import { UserParagraph } from "../components/editor/user/UserParagraph";
import { UserLink } from "../components/editor/user/UserLink";
import { UserNavbar } from "../components/editor/user/UserNavbar";

export const EditPage = () => {

  return (
    <div className="bg-gray-950 min-h-screen text-gray-300 flex flex-row">
      <Editor
        resolver={{
          Container,
          UserText,
          UserButton,
          UserImage,
          MinimalTest,
          'UserColumn': UserColumn,
          UserBgImage,
          UserSection,
          UserGrid,
          UserSpacer,
          UserAccordion,
          UserAccordionItem,
          UserHeading,
          UserParagraph,
          UserLink,
          UserNavbar
        }}
      >
        <div className="w-60 flex-shrink-0 h-screen overflow-y-auto p-4 border-r border-gray-800 bg-gray-950">
          <ToolBox />
        </div>

        <div className="flex-grow h-screen overflow-y-auto relative p-4 bg-gray-800/10">
          <div className="bg-white shadow-lg rounded-md h-full">
            <Frame>
              <Element
                is={UserBgImage}
                canvas
                bgImage="https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-9980.jpg"
              >
                {/* --- Navbar --- */}
                <Element
                  is={UserNavbar}
                  background="transparent" // Transparent background
                  paddingX={4} // Approx 4rem = 64px
                  paddingY={1.5} // Approx 1.5rem = 24px
                  borderBottomWidth={1}
                  borderBottomColor="rgba(255, 255, 255, 0.1)" // Subtle border
                  containerWidth="contained"
                  maxWidth={1280} // Adjust as needed
                  menuAlignment="center" // Center links between logo and button
                  custom={{ displayName: 'Header' }}
                >
                  {/* Logo Placeholder (Icon + Text) */}
                  <Element is="div" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} custom={{ displayName: 'LogoWrap' }}>
                    <Element is="div" style={{ width: '24px', height: '24px', background: '#BEF264', borderRadius: '3px' }} />
                    <Element is={UserText} text="Matias" fontSize={1.25} /* ~20px */ fontWeight="600" color="#FFFFFF" />
                  </Element>

                  {/* Menu Links Placeholder (Requires UserLink component) */}
                  <Element is="div" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} custom={{ displayName: 'NavLinks' }}>
                    <Element is={UserLink} text="Home" href="#" color="#FFFFFF" linkFontSize={0.875} fontWeight="500" underline="none" />
                    <Element is={UserLink} text="About" href="#" color="#AAAAAA" linkFontSize={0.875} fontWeight="500" underline="none" />
                  </Element>

                  {/* Action Button Placeholder */}
                  <Element is="div" custom={{ displayName: 'ActionBtnWrap' }}>
                    <Element is={UserButton} text="Let's Talk →" background="#BEF264" color="#000000" size="small" paddingX={1.25} paddingY={0.625} />
                  </Element>
                </Element>
                {/* --- End Navbar --- */}

                {/* --- Hero Section Container --- */}
                {/* Using a div with Flexbox to create columns */}
                {/* Added relative position for potential absolute elements like vertical text */}
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

