import '@codingame/monaco-vscode-typescript-basics-default-extension';
import '@codingame/monaco-vscode-typescript-language-features-default-extension';
import { LogLevel } from "vscode/services";
import { WrapperConfig } from "monaco-editor-wrapper";
import { useWorkerFactory } from "monaco-editor-wrapper/workerFactory";
import textEditorWorker from "monaco-editor/esm/vs/editor/editor.worker.js?worker&inline";
import textMateWorker from "@codingame/monaco-vscode-textmate-service-override/worker?worker&inline";

export const createWrapperConfig = (): WrapperConfig => {
  const codeUri = "/workspace/hello.ts";
  const code = `function sayHello(): string {
    return "Hello";
  };`;

  const codeOriginalUri = "/workspace/goodbye.ts";
  const codeOriginal = `function sayGoodbye(): string {
    return "Goodbye";
  };`;

  return {
    logLevel: LogLevel.Debug,
    vscodeApiConfig: {
      enableExtHostWorker: true,
      userConfiguration: {
        json: JSON.stringify({
          "workbench.colorTheme": "Default Dark Modern",
          "typescript.tsserver.web.projectWideIntellisense.enabled": true,
          "typescript.tsserver.web.projectWideIntellisense.suppressSemanticErrors": false,
          "diffEditor.renderSideBySide": false,
          "editor.lightbulb.enabled": "on",
          "editor.glyphMargin": true,
          "editor.guides.bracketPairsHorizontal": true,
          "editor.experimental.asyncTokenization": true,
        })
      }
    },
    editorAppConfig: {
      $type: "extended",
      codeResources: {
        main: {
          text: code,
          uri: codeUri,
        },
        original: {
          text: codeOriginal,
          uri: codeOriginalUri,
        }
      },
      useDiffEditor: false,
      monacoWorkerFactory: (logger) => {
        useWorkerFactory({
          workerOverrides: {
            ignoreMapping: true,
            workerLoaders: {
              TextEditorWorker: () => new textEditorWorker(),
              TextMateWorker: () => new textMateWorker(),
            }
          },
          logger,
        })
      },
      htmlContainer: document.getElementById(
        "monaco-editor-root"
      ) as HTMLElement
    }
  }
}