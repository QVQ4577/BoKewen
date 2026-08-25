declare module "*.mdx" {
  import type { MDXComponents } from "mdx/types";

  export const useMDXComponents: (components?: MDXComponents) => MDXComponents;
  export default function MDXContent(props: Record<string, unknown>): React.ReactElement;
}
