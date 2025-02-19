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


    return <div className="mockup-code w-full text-[0.55rem] md:w-[48rem] md:text-lg">
        <FormatCode code={code} language="python" cursor={{ row: 11, col: 3 }} />
    </div>
}

function FormatCode({ code, language, cursor }: { code: string; language: string; cursor?: Cursor }): JSX.Element {
    cursor;
    const highlighted_code: string[] = hljs.highlight(code, { language: language }).value.split("\n");
    const min_lines: number = 25;
    const needed_lines: number = Math.max(0, min_lines - highlighted_code.length);

    return <>
        {
            highlighted_code.concat(Array(needed_lines).fill("")).map((code, i) => {
                const line_number: string = (i >= highlighted_code.length) ? "" : String(i + 1);

                return <pre key={i} data-prefix={line_number}>
                    <code dangerouslySetInnerHTML={{ __html: code }} />
                </pre>
            })
        }
    </>
}
