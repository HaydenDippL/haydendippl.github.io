import { useEffect, useState } from "react";

import hljs from "highlight.js/lib/core"
import python from 'highlight.js/lib/languages/python';
import "highlight.js/styles/monokai.css";

import { instructions } from "../scripts/AnimationInstructions";

hljs.registerLanguage('python', python);

import Typewriter, { TypewriterOptions, Cursor } from "../scripts/Typewriter";

export default function CodeAnimation() {
    const [code, set_code] = useState<string>("");

    useEffect(() => {
        const typewriter_options: TypewriterOptions = {
            set_cursor: undefined,
            loop_index: undefined,
            debug: false
        };
        const typewriter: Typewriter = new Typewriter(instructions, set_code, typewriter_options);
        typewriter.play_animation();
    }, []);


    return <div className="mockup-code w-[48rem]">
        <FormatCode code={code} language="python" cursor={{ row: 11, col: 3 }} />
    </div>
}

function FormatCode({ code, language, cursor }: { code: string; language: string; cursor?: Cursor }): JSX.Element {
    const highlighted_code: string[] = hljs.highlight(code, { language: language }).value.split("\n");
    const min_lines: number = 0;
    for (let i = highlighted_code.length; i < min_lines; ++i) highlighted_code.push("");

    return <>
        {/* {
            highlighted_code.split("\n").map((code, i) => {
                return <pre key={i} data-prefix={i + 1} >
                    <code dangerouslySetInnerHTML={{ __html: code }}/>
                </pre>
            })
        } */}

        {
            highlighted_code.map((code, i) => {
                return <pre key={i} data-prefix={i + 1}>
                    <code dangerouslySetInnerHTML={{ __html: code }} />
                </pre>
            })
        }
    </>
}
