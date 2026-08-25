import { isValidElement, type ReactNode } from "react";
import GithubSlugger from "github-slugger";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/code-block";

function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (isValidElement(node)) {
    return nodeToText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

function headingId(children: ReactNode): string {
  const text = nodeToText(children).replace(/\s+/g, " ").trim();
  return new GithubSlugger().slug(text);
}

function extractCodeBlock(children: ReactNode): { code: string; lang: string } {
  let className = "";
  function walk(node: ReactNode): void {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (isValidElement(node)) {
      const props = node.props as { className?: string; children?: ReactNode };
      if (typeof props.className === "string" && props.className.includes("language-")) {
        className = props.className;
      }
      walk(props.children);
    }
  }
  walk(children);
  return {
    code: nodeToText(children),
    lang: className.replace(/.*language-/, "").trim(),
  };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: ({ children, ...props }) => (
      <h2 id={headingId(children)} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 id={headingId(children)} {...props}>
        {children}
      </h3>
    ),
    pre: ({ children }) => {
      const { code, lang } = extractCodeBlock(children);
      return <CodeBlock code={code} lang={lang} />;
    },
  };
}
