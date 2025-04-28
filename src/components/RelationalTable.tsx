import { Accessor, createMemo, For, Show } from "solid-js";

export type RelationalTableItem = {
  [key: string]: any;
};

export type RelationalTableProps = {
  items: Accessor<RelationalTableItem[]>;
  column: string | string[];
  row: string | string[];
  class?: {
    cell?: string;
    cols?: string;
    rows?: string;
  };
  cell: (
    item: RelationalTableItem[] | undefined,
    row?: number,
    col?: number
  ) => any;
  fallback?: string;
};

function RelationalTable(props: RelationalTableProps) {
  const columns = createMemo(() =>
    Array.isArray(props.column)
      ? props.column
      : Array.from(
          new Set(props.items().map((item) => item[props.column as string]))
        )
  );
  const rows = createMemo(() =>
    Array.isArray(props.row)
      ? props.row
      : Array.from(
          new Set(props.items().map((item) => item[props.row as string]))
        )
  );
  const data = createMemo(() =>
    Object.groupBy(
      props.items(),
      (item) =>
        `${item[props.column as string]},${item[props.row as string]}` as any
    )
  );
  const Cell = ({
    data,
    row,
    col,
  }: {
    data: RelationalTableItem[];
    row: number;
    col: number;
  }) => {
    const result = props.cell(data, row, col);
    return (
      <div
        class={
          "flex flex-col items-center justify-stretch " + props?.class?.cell
        }
      >
        {result}
      </div>
    );
  };

  return (
    <Show
      when={props.items().length > 0}
      fallback={
        props.fallback ? (
          <div class="font-bold uppercase p-2 rounded-sm">{props.fallback}</div>
        ) : null
      }
    >
      <table>
        <thead>
          <tr>
            <th class={props?.class?.cols}></th>
            <For each={columns()}>
              {(col, index) => (
                <th class={props?.class?.cols} data-index={index()}>
                  {col}
                </th>
              )}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={rows()}>
            {(row, rowIndex) => (
              <tr>
                <th class={props?.class?.rows} data-index={rowIndex()}>
                  {row}
                </th>
                <For each={columns()}>
                  {(col, colIndex) => (
                    <td data-index={`${rowIndex()}-${colIndex()}`}>
                      <Cell
                        data={data()[`${col},${row}`] ?? []}
                        row={rowIndex()}
                        col={colIndex()}
                      />
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </Show>
  );
}
export default RelationalTable;
