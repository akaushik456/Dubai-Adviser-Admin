interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right" | string | any;
  format?: (value: number) => string;
}

export const columns: readonly Column[] = [
  {
    id: "select",
    label: "select",
    align: "center",
  },
  {
    id: "Listing Name",
    label: "Listing Name",
    align: "left",
  },
  {
    id: "phone",
    label: "phone",
    align: "left",
  },
  {
    id: "email",
    label: "email",
    align: "left",
  },
  {
    id: "title",
    label: "title",
    align: "center",
  },
  {
    id: "description",
    label: "description",
    align: "center",
  },
  {
    id: "meta keywords",
    label: "meta keywords",
    align: "center",
  },
  {
    id: "category",
    label: "category",
    align: "center",
  },
  {
    id: "sub-category",
    label: "sub-category",
    align: "center",
  },
  {
    id: "view",
    label: "view",
    align: "center",
  },
  {
    id: "edit",
    label: "edit",
    align: "center",
  },
  {
    id: "delete",
    label: "delete",
    align: "center",
  },
];
