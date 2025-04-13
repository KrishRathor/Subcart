import { useNode } from "@craftjs/core"
import { SettingsInput } from "../SettingsInput";

interface UserBgImageProps {
  bgImage?: string,
  height?: number,
  width?: number,
  marginX?: number,
  marginY?: number,
  paddingX?: number,
  paddingy?: number,
  children?: React.ReactNode
}

export const UserBgImage = ({
  bgImage = 'https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg',
  height = 100,
  width = 100,
  marginX = 0,
  marginY = 0,
  paddingX = 0,
  paddingy = 0,
  children
}: UserBgImageProps) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div
      ref={(ref) => {
        ref && connect(drag(ref))
      }}
      // className={`h-[${height}%] w-[${width}%] mx-[${marginX}px] my-[${marginY}px] px-[${paddingX}px] py-[${paddingy}px] bg-[url('${bgImage}')] `}
      className="h-[100%] w-[100%]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: `${width}%`,
        height: `${height}%`,
        margin: `${marginX}px ${marginY}px`,
        padding: `${paddingX}px ${paddingy}px`
      }}
    >
      {children}
    </div>
  )
}

const UserBgImageSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserBgImageProps,
  }));

  return (
    <div className="space-y-3 p-4" >
      <SettingsInput
        label="Width in %"
        type="number"
        value={props.width ?? 100}
        onChange={(value) => setProp((props: UserBgImageProps) => props.width = parseInt(value, 10))}
      />
      <SettingsInput
        label="Height in %"
        type="number"
        value={props.height ?? 100}
        onChange={(value) => setProp((props: UserBgImageProps) => props.height = parseInt(value, 10))}
      />
      <SettingsInput
        label="MarginX in px"
        type="number"
        value={props.marginX ?? 0}
        onChange={(value) => setProp((props: UserBgImageProps) => props.marginX = parseInt(value, 10))}
      />
      <SettingsInput
        label="MarginY in px"
        type="number"
        value={props.marginY ?? 0}
        onChange={(value) => setProp((props: UserBgImageProps) => props.marginY = parseInt(value, 10))}
      />
      <SettingsInput
        label="PaddingX in px"
        type="number"
        value={props.paddingX ?? 0}
        onChange={(value) => setProp((props: UserBgImageProps) => props.paddingX = parseInt(value, 10))}
      />
      <SettingsInput
        label="MarginX in px"
        type="number"
        value={props.paddingy ?? 0}
        onChange={(value) => setProp((props: UserBgImageProps) => props.paddingy = parseInt(value, 10))}
      />
      <SettingsInput
        label="BG Image"
        type="string"
        value={props.bgImage ?? 'https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?t=st=1744527624~exp=1744531224~hmac=033ca353250f9564290569d4a8c0c10d13f6f61d0189839ba3979f87db749fcb&w=1380'}
        onChange={(value) => setProp((props: UserBgImageProps) => props.bgImage = value)}
      />

    </div>
  )

}

UserBgImage.craft = {
  props: {
    bgImage: 'https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?t=st=1744527624~exp=1744531224~hmac=033ca353250f9564290569d4a8c0c10d13f6f61d0189839ba3979f87db749fcb&w=1380',
    height: 100,
    width: 100,
    marginX: 0,
    marginY: 0,
    paddingX: 0,
    paddingy: 0,
  } as UserBgImageProps,
  related: {
    settings: UserBgImageSettings
  }
}
