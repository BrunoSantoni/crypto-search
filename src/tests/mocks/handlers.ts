import { rest } from 'msw';

export const handlers = [
  rest.get(
    'https://min-api.cryptocompare.com/data/all/coinlist',
    (req, res, ctx) => {
      const query = req.url.searchParams;

      const summary = query.get('summary');

      if (summary === 'true' || summary)
        return res(
          ctx.json({
            Data: {
              '42': {
                Id: '4321',
                ImageUrl: '/media/35650717/42.jpg',
                Symbol: '42',
                FullName: '42 Coin (42)',
              },
              '300': {
                Id: '749869',
                ImageUrl: '/media/27010595/300.png',
                Symbol: '300',
                FullName: '300 token (300)',
              },
            },
          }),
        );
    },
  ),

  rest.get(
    'https://min-api.cryptocompare.com/data/pricemultifull',
    (req, res, ctx) => {
      const query = req.url.searchParams;
      const fsyms = query.get('fsyms');
      const tsyms = query.get('tsyms');

      if (fsyms === '42' || tsyms === 'BRL')
        return res(
          ctx.json({
            RAW: {
              '42': {
                BRL: {
                  PRICE: 200.12,
                  CHANGEDAY: 100.5,
                  CHANGEPCTDAY: 0.3113710812129826,
                  IMAGEURL: '/media/35650717/42.jpg',
                },
              },
            },
          }),
        );
    },
  ),
];
