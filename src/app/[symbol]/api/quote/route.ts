import { sendRequest } from '@/core/sendRequest';
import { Quote } from '@/types/apis';
import isErrorWithMessage from '@/util/errorValidator';
import { NextRequest, NextResponse } from 'next/server';

export default async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const searchParamsObj: Record<string, string> = Object.fromEntries(
      searchParams.entries(),
    );

    if (
      !searchParamsObj.functionName ||
      !searchParamsObj.symbol ||
      !searchParamsObj.apikey
    ) {
      return NextResponse.json(
        { error: 'Missing required query parameters' },
        { status: 400 },
      );
    }

    const queryString: Quote = {
      functionName: 'GLOBAL_QUOTE',
      symbol: searchParamsObj.symbol,
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
