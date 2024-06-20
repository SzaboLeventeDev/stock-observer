import { sendRequest } from '@/core/sendRequest';
import { Search } from '@/types/apis';
import isErrorWithMessage from '@/util/errorValidator';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const searchParamsObj: Record<string, string> = Object.fromEntries(
      searchParams.entries(),
    );

    if (
      !searchParamsObj.functionName ||
      !searchParamsObj.keywords ||
      !searchParamsObj.apikey
    ) {
      return NextResponse.json(
        { error: 'Missing required query parameters' },
        { status: 400 },
      );
    }

    const queryString: Search = {
      functionName: 'SYMBOL_SEARCH',
      keywords: searchParamsObj.keywords,
      datatype: 'json',
      apikey: searchParamsObj.apikey,
    };

    const data = await sendRequest(queryString);

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error during request', { error });
    const errorMessage = isErrorWithMessage(error)
      ? error.message
      : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
