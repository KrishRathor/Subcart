import { Element, useNode } from "@craftjs/core"

interface UserColumnProps {
  columnCount?: number,
  gap?: number
}

export const UserColumn = ({ columnCount = 2, gap = 10 }: UserColumnProps) => {

  const { connectors: { connect, drag } } = useNode();

  return (
    <div
      ref={(ref) => {
        ref && connect(drag(ref))
      }}
      className={`bg-red-500 h-[80px] flex w-[100%] `}
    >
      {
        Array.from({ length: columnCount }).map((_, index) => (
          <Element
            is="div"
            id={`column-${index}`}
            canvas
            className={`bg-yellow-500 h-[50px] w-[100%] border border-white `}
          >
          </Element>
        ))
      }
    </div>
  )
}
