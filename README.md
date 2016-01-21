# Slash Command for Mixmax to show stock information


## Running locally

1. Install using `npm install`
2. Run using `npm start`
3. Verify it works by visiting http://localhost:9145/typeahead?text=winning and http://localhost:9145/resolver?text=winning in your browser. It should not throw an error.
4. Open up the Mixmax Dashboard, click Integrations, and click Add Slash Command.
5. Enter the following inputs:

| Input name            | value                           |
|-----------------------|---------------------------------|
| Name                  | Stock Search                    |
| Command               | stock                           |
| Parameter placeholder | [stock symbol]                  |
| Typeahead API URL     | http://localhost:9145/typeahead |
| Resolver API URL      | http://localhost:9145/resolver  |


