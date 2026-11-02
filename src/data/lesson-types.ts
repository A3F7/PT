export type Block =
  | { k: "h"; t: string }
  | { k: "p"; t: string }
  | { k: "exam"; t: string }
  | { k: "list"; items: string[] }
  | { k: "steps"; title?: string; items: string[] }
  | { k: "table"; heads: string[]; rows: string[][] }
  | { k: "flow"; steps: string[]; note: string }
  | {
      k: "win";
      title: string;
      menus: string[];
      open: string;
      items: { label: string; hot?: string }[];
      pick?: string;
      fields?: string[];
      note: string;
    };

export interface Lesson {
  id: string;
  n: number;
  ar: string;
  en: string;
  blurb: string;
  blocks: Block[];
}

export type MenuItem = { label: string; hot?: string };
