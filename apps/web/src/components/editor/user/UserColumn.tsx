import { Element, useNode } from "@craftjs/core"
import { SettingsInput } from "../SettingsInput";

interface UserColumnProps {
  columnCount?: number,
  gap?: number,
  children: React.ReactNode
}

export const UserColumn = ({ columnCount = 2, gap = 10, children }: UserColumnProps) => {

  const { connectors: { connect, drag, } } = useNode();

  return (
    <div
      ref={(ref) => {
        ref && connect(drag(ref))
      }}
      className={`bg-red-300 h-[80px] grid grid-cols-4 w-[100%] `}
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
    </div>
  )
}

UserColumn.craft = {
  props: {
    columnCount: 2,
    gap: 10
  } as UserColumnProps,
  related: {
    settings: UserColumnSettings
  },
  displayName: "UserColumn",

}

console.log("UserColumn.craft definition:", UserColumn.craft);
console.log("   -> Settings function:", UserColumn.craft?.related?.settings);
