import type { NextApiRequest, NextApiResponse } from 'next';

const Python = require('python-runner');

type Data = any;

// create_submission(input: $input) {
//   error_message
//   error_code
//   status
//   submission {
//     id
//     user_id
//     programming_language_id
//     input
//     code_content
//     output
//     error
//     running_time
//     memory_used
//     created_at
//     submission_status
//   }
// }
const readlineFn = (input: string) => {
  return `
stdin = '''${input}'''.split()
def input():
  if(len(stdin) < 0):
    raise Exception("No more data to read from stdin.")
  else:
    line = stdin[-1]
    stdin.pop()
    return line
`;
};
const runPythonCode = async (code: string, input: string, languageId: any) => {
  return Python.exec([readlineFn(input) + code], { bin: 'python' })
    .then(function (output: any) {
      return {
        data: {
          create_submission: {
            status: 'sucess',
            submission: {
              id: Math.round(Math.random() * 100000000000),
              user_id: '',
              programming_language_id: languageId,
              input,
              code_content: code,
              output,
              running_time: 0,
              memory_used: 0,
              created_at: Date.now(),
              submission_status: 'FULLY_FINISHED',
            },
          },
        },
      };
    })
    .catch(function (err: any) {
      return {
        data: {
          create_submission: {
            error_code: 'runtime_error',
            error_message: `Runtime error:\n${err ?? err.message}`,
          },
        },
      };
    });
};

// const CREATE_SUBMISSION_MUTATION = gql`
//   mutation create_submission($input: CreateSubmissionInput!) {
//     create_submission(input: $input) {
//       error_message
//       error_code
//       status
//       submission {
//         id
//         user_id
//         programming_language_id
//         input
//         code_content
//         output
//         error
//         running_time
//         memory_used
//         created_at
//         submission_status
//       }
//     }
//   }
// `;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const {
    code,
    customInput,
    languageId,
  }: { code: string; customInput: string; languageId: number } = req.body;

  if (languageId !== 71 && languageId !== 70) {
    res.status(405).json({
      error_code: 'language_not_supported',
      error_message:
        'Oops! Currently Python is the only language that is supported! Please choose Python!',
    });
    return;
  }

  const result = await runPythonCode(
    code || '',
    customInput || '',
    languageId || 63,
  );

  // const result = await makeGraphqlMutation(
  //   CREATE_SUBMISSION_MUTATION,
  //   {
  //     input: {
  //       code: code || '',
  //       input: customInput || '',
  //       programming_language_id: languageId || 63,
  //     },
  //   },
  //   {
  //     headers: {
  //       authorization: req.headers.authorization,
  //     },
  //   },
  // ).catch((err: Error) => {
  //   // console.log(err);
  //   console.log(err.message);
  //   return {
  //     data: {
  //       create_submission: {
  //         ...(err.message.toLowerCase().includes('authentication') ||
  //         err.message.toLowerCase().includes('authorization')
  //           ? {
  //               error_code: 'authentication_error',
  //               error_message: 'User not authenticated',
  //             }
  //           : {
  //               error_code: 'internal_server_error',
  //               error_message: 'Internal server error! Please try again later',
  //             }),
  //       },
  //     },
  //   };
  // });

  if (result?.data?.create_submission?.error_message) {
    res.status(500).json({
      ...result?.data?.create_submission,
    });
  } else {
    res.status(201).json({
      ...result?.data?.create_submission,
    });
  }
}
