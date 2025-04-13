import { Element, useNode } from "@craftjs/core"
import { SettingsInput } from "../SettingsInput";
import { SettingsSelect } from "../SettingsSelect";

interface UserColumnProps {
  columnCount?: number,
  gap?: number,
  height?: number,
  width?: number,
  border?: string,
  marginTop?: number,
  marginLeft?: number,
  marginRight?: number,
  children?: React.ReactNode
}

export const UserColumn = ({
  columnCount = 2,
  gap = 10,
  height = 300,
  width = 100,
  border = 'true',
  marginTop = 0,
  marginRight = 0,
  marginLeft = 0,
  children
}: UserColumnProps) => {

  const { connectors: { connect, drag, } } = useNode();

  return (
    <div
      ref={(ref) => {
        ref && connect(drag(ref))
      }}
      style={{
        height: `${height}px`,
        width: `${width}%`,
        border: ` ${border === 'true' ? '2px dashed black' : 'none'} `,
        display: 'grid',
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        marginTop: `${marginTop}px`,
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`
      }}
    >
      {children}
    </div>
  )
}

const UserColumnSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as UserColumnProps,
  }));

  return (
    <div className="space-y-3 p-4">
      <SettingsInput
        label="Column Count"
        type="number"
        value={props.columnCount ?? 2}
        onChange={(value) => setProp((props: UserColumnProps) => props.columnCount = parseInt(value, 10))}
      />
      <SettingsInput
        label="height in px"
        type="number"
        value={props.height ?? 300}
        onChange={(value) => setProp((props: UserColumnProps) => props.height = parseInt(value, 10))}
      />
      <SettingsInput
        label="wdith in %"
        type="number"
        value={props.width ?? 100}
        onChange={(value) => setProp((props: UserColumnProps) => props.width = parseInt(value, 10))}
      />
      <SettingsInput
        label="Margin Top in px"
        type="number"
        value={props.marginTop ?? 0}
        onChange={(value) => setProp((props: UserColumnProps) => props.marginTop = parseInt(value, 10))}
      />
      <SettingsInput
        label="Margin Left in px"
        type="number"
        value={props.marginLeft ?? 0}
        onChange={(value) => setProp((props: UserColumnProps) => props.marginLeft = parseInt(value, 10))}
      />
      <SettingsInput
        label="Margin Right in px"
        type="number"
        value={props.marginRight ?? 0}
        onChange={(value) => setProp((props: UserColumnProps) => props.marginRight = parseInt(value, 10))}
      />
      <SettingsSelect
        label="Alignment"
        options={[
          { value: 'true', label: 'True' },
          { value: 'false', label: 'False' },
        ]}
        value={props.border || 'true'}
        onChange={(value) => setProp((props: UserColumnProps) => props.border = value)}
      />

    </div>
  )
}

UserColumn.craft = {
  props: {
    columnCount: 2,
    gap: 10,
    height: 300,
    width: 100,
    border: 'true',
    marginRight: 0,
    marginTop: 0,
    marginLeft: 0
  } as UserColumnProps,
  related: {
    settings: UserColumnSettings
  },
  displayName: "UserColumn",

}

console.log("UserColumn.craft definition:", UserColumn.craft);
console.log("   -> Settings function:", UserColumn.craft?.related?.settings);
