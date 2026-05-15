exports.handler = async function() {

  const AIRTABLE_TOKEN =
    process.env.AIRTABLE_TOKEN;

  const BASE_ID =
    process.env.AIRTABLE_BASE_ID;

  const TABLE_NAME =
    process.env.AIRTABLE_TABLE_NAME;

  const url =
    `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;

  try {

    const response = await fetch(url, {
      headers: {
        Authorization:
          `Bearer ${AIRTABLE_TOKEN}`
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
