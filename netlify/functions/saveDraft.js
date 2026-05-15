exports.handler = async function(event) {

  const AIRTABLE_TOKEN =
    process.env.AIRTABLE_TOKEN;

  const BASE_ID =
    process.env.AIRTABLE_BASE_ID;

  const TABLE_NAME =
    process.env.AIRTABLE_TABLE_NAME;

  try {

    const body = JSON.parse(event.body);

    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`,
      {
        method: 'POST',

        headers: {
          Authorization:
            `Bearer ${AIRTABLE_TOKEN}`,

          'Content-Type':
            'application/json'
        },

        body: JSON.stringify({
          fields: {

            Name: body.versionName,

            Date:
              new Date().toLocaleString(),

            Data:
              JSON.stringify(body.draftData)
          }
        })
      }
    );

    const result = await response.json();

    console.log(result);

    return {
      statusCode: 200,
      body: JSON.stringify(result)
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
