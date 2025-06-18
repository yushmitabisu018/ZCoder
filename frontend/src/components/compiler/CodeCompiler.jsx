import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "./Compiler.css";

const templates = {
  python: `# your code goes here`,
  javascript: `// your code goes here`,
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // your code goes here
    return 0;
}
`,
  c: `#include <stdio.h>

int main() {
    // your code goes here
    return 0;
}
`,
  java: `import java.util.*;
import java.lang.*;
import java.io.*;

class ZCoder {
    public static void main(String[] args) throws java.lang.Exception {
        // your code goes here
    }
}
`
};

const OnlineCompiler = () => {
  const langIdToKey = {
    50: "c",
    54: "cpp",
    71: "python",
    62: "java",
    63: "javascript",
  };

  const [language, setLanguage] = useState("54");
  const [code, setCode] = useState(templates.cpp);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const languages = [
    { id: "50", name: "C" },
    { id: "54", name: "C++" },
    { id: "71", name: "Python" },
    { id: "62", name: "Java" },
    { id: "63", name: "JavaScript" },
  ];

  const RAPIDAPI_HOST = "judge0-ce.p.rapidapi.com";
  const RAPIDAPI_KEY = "d19705a9b5msh8039ddde4d39ef1p158c6ajsne63d0a379e57";

  useEffect(() => {
    const langKey = langIdToKey[parseInt(language)];
    setCode(templates[langKey] || "");
  }, [language]);

  const submitCode = async () => {
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch(`https://${RAPIDAPI_HOST}/submissions?base64_encoded=true&wait=false`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": RAPIDAPI_HOST,
          "x-rapidapi-key": RAPIDAPI_KEY,
        },
        body: JSON.stringify({
          language_id: parseInt(language),
          source_code: btoa(code),
          stdin: btoa(input),
        }),
      });

      const data = await response.json();
      const token = data.token;

      let result = null;
      while (true) {
        const res = await fetch(`https://${RAPIDAPI_HOST}/submissions/${token}?base64_encoded=true&fields=*`, {
          method: "GET",
          headers: {
            "x-rapidapi-host": RAPIDAPI_HOST,
            "x-rapidapi-key": RAPIDAPI_KEY,
          },
        });

        result = await res.json();
        if (result.status.id >= 3) break;

        await new Promise((r) => setTimeout(r, 1000));
      }

      const decodeBase64 = (str) => (str ? atob(str) : "");

      if (result.compile_output) {
        setOutput(`Compile Error:\n${decodeBase64(result.compile_output)}`);
      } else if (result.stderr) {
        setOutput(`Runtime Error:\n${decodeBase64(result.stderr)}`);
      } else {
        setOutput(decodeBase64(result.stdout) || "No output");
      }
    } catch (error) {
      setOutput("Error: " + error.message);
    }

    setLoading(false);
  };

  const getMonacoLang = () => {
    switch (language) {
      case "50": return "c";
      case "54": return "cpp";
      case "71": return "python";
      case "62": return "java";
      case "63": return "javascript";
      default: return "plaintext";
    }
  };

  return (
    <div className="compiler-container">
      <div className="editor-section">
        <div className="top-bar">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="editor-wrapper">
          <Editor
            height="100%"
            width="100%"
            language={getMonacoLang()}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
            options={{
              automaticLayout: true,
              autoClosingBrackets: "always",
              autoClosingQuotes: "always",
              fontSize: 18,
               fontFamily: "JetBrains Mono, monospace",
              minimap: { enabled: false },
              lineNumbers: "on",
            }}
          />
        </div>
      </div>

      <div className="io-section">
        <button onClick={submitCode} disabled={loading || !code.trim()}>
          {loading ? "Running..." : "Run Code"}
        </button>

        <label>Input:</label>
        <textarea
          className="input-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <label>Output:</label>
        <pre className="output-box">{output}</pre>
      </div>
    </div>
  );
};

export default OnlineCompiler;

// import React, { useState, useEffect } from "react";
// import Editor from "@monaco-editor/react";
// import "./Compiler.css";

// const templates = {
//   python: `# your code goes here`,
//   javascript: `// your code goes here`,
//   cpp: `#include <bits/stdc++.h>
// using namespace std;

// int main() {
//     // your code goes here
//     return 0;
// }
// `,
//   c: `#include <stdio.h>

// int main() {
//     // your code goes here
//     return 0;
// }
// `,
//   java: `import java.util.*;
// import java.lang.*;
// import java.io.*;

// class ZCoder {
//     public static void main(String[] args) throws java.lang.Exception {
//         // your code goes here
//     }
// }
// `
// };

// const OnlineCompiler = () => {
//   const langIdToKey = {
//     50: "c",
//     54: "cpp",
//     71: "python",
//     62: "java",
//     63: "javascript",
//   };

//   const [language, setLanguage] = useState("54");
//   const [code, setCode] = useState(templates.cpp);
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const languages = [
//     { id: "50", name: "C" },
//     { id: "54", name: "C++" },
//     { id: "71", name: "Python" },
//     { id: "62", name: "Java" },
//     { id: "63", name: "JavaScript" },
//   ];

//   const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST;
//   const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

//   useEffect(() => {
//     const langKey = langIdToKey[parseInt(language)];
//     setCode(templates[langKey] || "");
//   }, [language]);

//   const submitCode = async () => {
//     setLoading(true);
//     setOutput("");

//     try {
//       const response = await fetch(`https://${RAPIDAPI_HOST}/submissions?base64_encoded=true&wait=false`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-rapidapi-host": RAPIDAPI_HOST,
//           "x-rapidapi-key": RAPIDAPI_KEY,
//         },
//         body: JSON.stringify({
//           language_id: parseInt(language),
//           source_code: btoa(code),
//           stdin: btoa(input),
//         }),
//       });

//       const data = await response.json();
//       const token = data.token;

//       let result = null;
//       while (true) {
//         const res = await fetch(`https://${RAPIDAPI_HOST}/submissions/${token}?base64_encoded=true&fields=*`, {
//           method: "GET",
//           headers: {
//             "x-rapidapi-host": RAPIDAPI_HOST,
//             "x-rapidapi-key": RAPIDAPI_KEY,
//           },
//         });

//         result = await res.json();
//         if (result.status.id >= 3) break;

//         await new Promise((r) => setTimeout(r, 1000));
//       }

//       const decodeBase64 = (str) => (str ? atob(str) : "");

//       if (result.compile_output) {
//         setOutput(`Compile Error:\n${decodeBase64(result.compile_output)}`);
//       } else if (result.stderr) {
//         setOutput(`Runtime Error:\n${decodeBase64(result.stderr)}`);
//       } else {
//         setOutput(decodeBase64(result.stdout) || "No output");
//       }
//     } catch (error) {
//       setOutput("Error: " + error.message);
//     }

//     setLoading(false);
//   };

//   const getMonacoLang = () => {
//     switch (language) {
//       case "50": return "c";
//       case "54": return "cpp";
//       case "71": return "python";
//       case "62": return "java";
//       case "63": return "javascript";
//       default: return "plaintext";
//     }
//   };

//   return (
//     <div className="compiler-container">
//       <div className="editor-section">
//         <div className="top-bar">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//           >
//             {languages.map((lang) => (
//               <option key={lang.id} value={lang.id}>
//                 {lang.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="editor-wrapper">
//           <Editor
//             height="100%"
//             width="100%"
//             language={getMonacoLang()}
//             value={code}
//             onChange={(value) => setCode(value || "")}
//             theme="vs-dark"
//             options={{
//               automaticLayout: true,
//               autoClosingBrackets: "always",
//               autoClosingQuotes: "always",
//               fontSize: 18,
//               fontFamily: "JetBrains Mono, monospace",
//               minimap: { enabled: false },
//               lineNumbers: "on",
//             }}
//           />
//         </div>
//       </div>

//       <div className="io-section">
//         <button onClick={submitCode} disabled={loading || !code.trim()}>
//           {loading ? "Running..." : "Run Code"}
//         </button>

//         <label>Input:</label>
//         <textarea
//           className="input-box"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />

//         <label>Output:</label>
//         <pre className="output-box">{output}</pre>
//       </div>
//     </div>
//   );
// };

// export default OnlineCompiler;

