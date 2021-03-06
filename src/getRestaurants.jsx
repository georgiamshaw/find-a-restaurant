import { createClient } from 'contentful';

const getRestaurants = async () => {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    environment: 'master',
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  const response = await client.getEntries();
  console.log(response.items, 'this is response');
  return response.items.map((item) => item.fields);
};

export default getRestaurants;
