import ReactDOMServer from 'react-dom/server';
import { Editor, Frame } from '@craftjs/core';
import { UserButton } from "../components/editor/user/UserButton";
import { UserText } from "../components/editor/user/UserText";
import { Container } from "../components/editor/user/UserContainer";
import { UserImage } from "../components/editor/user/UserImage";
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

export const renderMarkup = (JSONStateString: string) => {
  return ReactDOMServer.renderToStaticMarkup(<Editor enabled={false} resolver={
    {
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
    }
  } >
    <Frame json={JSONStateString} />
  </Editor>);
}

