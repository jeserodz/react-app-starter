require('dotenv').config();
const child_process = require('child_process');

if (!process.env.OPENAPI_SPEC_URL) {
  console.error(
    "Error: Can't find the OPENAPI_SPEC_URL environment variable. Add it to the .env file."
  );
  process.exit(1);
}

const ls = child_process.exec(
  'openapi-generator-cli generate -g typescript-axios --skip-validate-spec -o src/api -i $OPENAPI_SPEC_URL'
);

ls.stdout.on('data', console.log);
ls.stderr.on('data', console.error);
