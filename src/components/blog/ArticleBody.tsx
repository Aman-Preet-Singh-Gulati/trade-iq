import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

const components: Components = {
  h2: ({ children }) => (
    <h2 className="font-headline-lg text-headline-lg text-primary mt-10 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-headline-lg-mobile text-primary mt-8 mb-3 text-xl font-bold">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="font-body-md text-on-surface-variant mb-5 leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-on-surface-variant font-body-md">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-on-surface-variant font-body-md">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} className="text-primary font-bold underline underline-offset-4 hover:text-surface-tint">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary-fixed pl-6 italic text-secondary my-6">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }) => (
    <span className="block my-8">
      <img
        src={typeof src === 'string' ? src : undefined}
        alt={alt}
        className="w-full rounded-lg border border-outline-variant"
        loading="lazy"
      />
      {alt && (
        <span className="block mt-2 text-center font-body-sm text-secondary italic">{alt}</span>
      )}
    </span>
  ),
  pre: ({ children }) => (
    <pre className="bg-surface-container-high border border-outline-variant rounded-lg p-4 mb-5 overflow-x-auto font-mono text-body-sm leading-relaxed">
      {children}
    </pre>
  ),
  code: ({ className, children }) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="bg-surface-container-high border border-outline-variant rounded px-1.5 py-0.5 font-mono text-[0.9em] text-primary">
        {children}
      </code>
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6 rounded-lg border border-outline-variant">
      <table className="w-full border-collapse font-body-sm text-body-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-surface-container-high text-primary font-bold">{children}</thead>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-outline-variant">{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="text-left align-top px-4 py-3 font-label-caps text-label-caps text-primary">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="text-left align-top px-4 py-3 text-on-surface-variant leading-relaxed">{children}</td>
  ),
};

export default function ArticleBody({ content }: { content: string }) {
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
