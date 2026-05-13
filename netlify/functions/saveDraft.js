exports.handler = async function(event) {

  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
  const BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

  try {

    const data = JSON.parse(event.body);

    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            Name: data.name,
            Notes: JSON.stringify(data)
          }
        })
      }
    );

   const result = await response.json();

console.log("AIRTABLE RESPONSE:", result);

if (!response.ok) {
  return {
    statusCode: response.status,
    body: JSON.stringify({
      success: false,
      airtableError: result
    })
  };
}

return {
  statusCode: 200,
  body: JSON.stringify({
    success: true,
    airtable: result
  })
};

  } catch (error) {

    return {
      statusCode: 500,
     body: JSON.stringify({
  fields: {
    version_name: data.version_name,
    created_at: new Date().toISOString(),

    client_name: data.client_name,
    project_name: data.project_name,
    week_of: data.week_of,
    issue_no: data.issue_no,
    completion_date: data.completion_date,

    notes: data.notes,
    inspiration: data.inspiration,

    wins_json: data.wins_json,
    actions_json: data.actions_json,
    phases_json: data.phases_json,
    payments_json: data.payments_json
  }
})
    };

  }
};
