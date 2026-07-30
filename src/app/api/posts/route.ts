import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPublishedPostsPage, MAX_PAGE_SIZE } from '@/lib/posts';

const querySchema = z.object({
  category: z.string().trim().max(64).optional(),
  q: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).default(4),
});

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const parsed = querySchema.safeParse(searchParams);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid query parameters', details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { category, q, page, limit } = parsed.data;

  try {
    const { posts, hasMore } = await getPublishedPostsPage({
      categorySlug: category,
      q,
      page,
      limit,
    });

    return NextResponse.json({ posts, hasMore }, { status: 200 });
  } catch (error: any) {
    console.error('[Posts API Error]:', error);
    return NextResponse.json({ error: 'Server Error. Please try again.' }, { status: 500 });
  }
}
