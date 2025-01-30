// FIXME: implement dry run
// FIXME: better error handling and checking
// FIXME: implement cursor manipulation
// FIXME: test pausing

// Args for user input instructions
type WriteArgs = { row: number, col: number, text: string, speed_ms?: number };
type DeleteArgs = { row: number, col: number, num_deletions: number, speed_ms?: number, reverse?: boolean }; 
type DeleteLinesArgs = { start: number, end: number, speed_ms?: number, reverse?: boolean };
type SleepArgs = { sleep_ms: number };

// Instruction type definitions w/ args
type WriteInstruction = ["write", WriteArgs];
type DeleteInstruction = ["delete", DeleteArgs];
type DeleteLinesInstruction = ["delete-lines", DeleteLinesArgs];
type SleepInstruction = ["sleep", SleepArgs];
type CallbackInstruction = ["callback", (...args: any[]) => void, ...any[]];

// Class encompassing all possible Instructions
export type TypewriteInstruction = WriteInstruction | DeleteInstruction | DeleteLinesInstruction | SleepInstruction | CallbackInstruction;


// Args for the helper functions 
type WriteHelperArgs = { i: number, t: number, speed_ms: number, text: string, base: string };
type DeleteHelperArgs = { i: number, d: number, speed_ms: number, reverse: boolean, text: string };

// Pause states which are used to pause / resume animation
type WritePauseState = ["write", WriteHelperArgs];
type DeletePauseState = ["delete", DeleteHelperArgs];

// Type encompassing all pause states
type PauseState = WritePauseState | DeletePauseState;


// type definition for the option cursor tracking
export type Cursor = { row: number, col: number };

// type definition for optional arguments when creating the Typewriter
export type TypewriterOptions = {
    set_cursor?: React.Dispatch<React.SetStateAction<Cursor>>;
    loop_index?: number;
    debug?: boolean;
};

const DEFAULT_SPEED_MS = 50;

enum CursorRangeError {
    i_too_big = -1,
    i_too_small = -2
};

/**
 * A class that can be used to create a Typing animation in React web components
 */
export default class Typewriter {
    private instructions: TypewriteInstruction[] = [];
    private set_text: React.Dispatch<React.SetStateAction<string>>;
    private set_cursor: React.Dispatch<React.SetStateAction<Cursor>> | undefined;
    private i: number = 0;
    private loop_index: number | undefined;
    private debug: boolean;
    private is_playing: boolean = false;
    private pause_signal: boolean = false;
    private pause_state: PauseState | null = null;

    constructor(
        instructions: TypewriteInstruction[],
        set_text: React.Dispatch<React.SetStateAction<string>>,
        options: TypewriterOptions
    ) {
        this.instructions = instructions;
        this.set_text = set_text;

        this.set_cursor = options.set_cursor;
        this.loop_index = options.loop_index;
        this.debug = options.debug || false;
        this.set_cursor;

        this.dry_run();
    }

    // ---------------------------------- PUBLIC ------------------------------------------

    /**
     * Plays the Typewriter animation
     * 
     * @returns {Promise<void>} asynchrnously plays animation
     */
    public async play_animation(): Promise<void> {
        if (this.is_playing) return;

        this.is_playing = true;

        return new Promise<void>(async (resolve) => {
            while (this.i < this.instructions.length) {
                if (this.pause_state !== null) {
                    switch (this.pause_state[0]) {
                        case "write":
                            await this.write_text_helper(this.pause_state[1]);
                            break;
                        case "delete":
                            await this.delete_text_helper(this.pause_state[1]);
                            break;
                        default:
                            console.warn(`WARNING: pause state ${this.pause_state[0]} not recognized.
                                Please use pause states "write" and "delete" according to the documentation.
                                Pause state ignored and execution continued.`);
                            break;
                    }
                    this.pause_state = null;
                    this.pause_signal = false;
                    continue;
                }
    
                const instruction: TypewriteInstruction = this.instructions[this.i];
                switch (instruction[0]) {
                    case "write":
                        console.log(this.i, Date.now());
                        await this.write_text(instruction[1]);
                        break;
                    case "delete":
                        console.log(this.i, Date.now());
                        await this.delete_text(instruction[1]);
                        break;
                    case "delete-lines":
                        console.log(this.i, Date.now());
                        await this.delete_lines(instruction[1]);
                        console.log("completed");
                        break;
                    case "sleep":
                        if (!this.debug) await this.sleep(instruction[1]);
                        break;
                    case "callback":
                        const callback: (...args: any[]) => void = instruction[1];
                        callback(instruction[2]);
                        break;
                    default:
                        const error_message_expected: string = "Instructions must be arrays with the 0th element of:\n\"write\"\n\"delete\"\n\"delete-lines\"\n\"sleep\"\n\"callback\"\n";
                        const error_message_actual: string = Array.isArray(instruction) ?
                            `    Your 0th element was a \"${typeof instruction[0]}\" with a value of ${instruction[0]}` :
                            `    Your instruction at index=${this.i} was not an array, but a ${typeof instruction}`;
                        throw new Error(error_message_expected + "\n" + error_message_actual);
                }
                
                ++this.i;
                if (this.i >= this.instructions.length && this.loop_index !== undefined) this.i = this.loop_index;
            }
            
            resolve();
        });
    }

    /**
     * Pauses the Typewriter animation
     * 
     * @returns {void}
     */
    public pause_animation(): void {
        this.is_playing = false;
        this.pause_signal = true;
    }

    // ---------------------------------- PRIVATE -----------------------------------------

    /**
     * Completes a dry run of the animation to find any errors
     * - Unexpected types
     * - Invalid row, col indexing
     * - Deleting too many characters
     * 
     * @returns {void}
     * @throws {Error} if any error is found in dry run
     */
    private dry_run(): void {
        
    }
 
    /**
     * Retrieves the current text from the state.
     *
     * @returns {Promise<string>} A promise that resolves with the current text in the state.
     */
    private get_current_text(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.set_text(prev => {
                resolve(prev);
                return prev;
            });
        });
    }

    /**
     * Animates the writing of specific text to a (row, col) in the state string and at a specific speed
     *
     * @param {Object} args - The arguments for writing text.
     * @param {number} args.row - The row number where the text should be written.
     * @param {number} args.col - The column number where the text should be written.
     * @param {string} args.text - The text to be written.
     * @param {number} [args.speed_ms] - The speed in milliseconds at which the text should be written. If not provided or less than or equal to 0, the text will be written instantly.
     * @returns {Promise<void>} A promise that resolves when the text has been written.
     */
    private async write_text({ row, col, text, speed_ms }: WriteArgs): Promise<void> {
        // handle speed inputs
        let instant: boolean = this.debug;
        if (speed_ms === undefined) speed_ms = DEFAULT_SPEED_MS;
        else if (speed_ms <= 0) instant = true;

        // get base string and index i
        const base: string = await this.get_current_text();
        let i: number = get_index(row, col, base);

        console.log("base", i, base);

        if (instant) {
            this.set_text(write_text_in_base(i, text, base));
        } else {
            return new Promise<void>(async (resolve) => {
                await this.write_text_helper({i: i, t: 0, speed_ms: speed_ms, text: text, base: base});
                resolve();
            });
        }
    }

    /**
     * Helper function to animate the writing of text character by character.
     *
     * @param {number} i - The current index in the base string where the text should be written.
     * @param {number} t - The current index in the text string being written.
     * @param {number} speed_ms - The speed in milliseconds at which each character should be written.
     * @param {string} text - The text to be written.
     * @param {string} base - The base string to which the text is being written.
     * @returns {Promise<void>} A promise that resolves when the text has been written.
     */
    private write_text_helper({i, t, speed_ms, text, base}: WriteHelperArgs): Promise<void> {
        return new Promise<void>((resolve) => {
            if (t === 0) console.log("write_text_helper", base)
            const start_ms: number = Date.now();

            const new_text: string = write_text_in_base(i, text[t], base);
            
            const end_ms: number = Date.now();
            const delay_ms: number = Math.max(0, speed_ms - (end_ms - start_ms));
            
            setTimeout(async () => {
                this.set_text(new_text);

                ++t;
                ++i;
                if (t >= text.length) {
                    resolve();
                } else if (this.pause_signal) {
                    this.pause_state = ["write", { i: i, t: t, speed_ms: speed_ms, text: text, base: new_text }];
                    resolve();
                } else {
                    await this.write_text_helper({i: i, t: t, speed_ms: speed_ms, text: text, base: new_text});
                    resolve()
                }
            }, delay_ms);
        });
    }

    /**
     * Animates the deletion of text from a specified (row, col) in the state string at a specific speed.
     * Can be reversed to simulate 'DELETE' instead of 'BACKSPACE'
     *
     * @param {Object} args - The arguments for deleting text.
     * @param {number} args.row - The row number where the text should be deleted.
     * @param {number} args.col - The column number where the text should be deleted.
     * @param {number} args.num_deletions - The number of characters to delete.
     * @param {number} [args.speed_ms] - The speed in milliseconds at which the text should be deleted. If not provided or less than or equal to 0, the text will be deleted instantly.
     * @param {boolean} [args.reverse] - If true, the text will be deleted in reverse order.
     * @returns {Promise<void>} A promise that resolves when the text has been deleted.
     * @throws {Error} If the number of deletions exceeds the available, deletable characters from the specified position.
     */
    private async delete_text({ row, col, num_deletions, speed_ms, reverse }: DeleteArgs): Promise<void> {
        // handle speed_ms and reverse inputs
        reverse = reverse || false;
        let instant: boolean = this.debug;
        if (speed_ms === undefined) speed_ms = DEFAULT_SPEED_MS;
        else if (speed_ms <= 0) instant = true;

        let base: string = await this.get_current_text();
        let i: number = get_index(row, col, base);

        // TODO: reverse support
        if (instant) {
            const new_text: string | number = delete_text_from_base(i, num_deletions, base, reverse);
            if (new_text == -1) console.error("ERROR: cursor index i is less than 0");
            else if (new_text == -2) console.error("Error: cursor index i is greater than the maximum possible position");
            else if (typeof new_text == "string") this.set_text(new_text);
        } else {
            return new Promise(async (resolve) => {
                await this.delete_text_helper({i: i, d: num_deletions, speed_ms: speed_ms, reverse: reverse, text: base});
                resolve();
            });
        }

    }

    /**
     * Animates the deletion of multiple lines of text from the state string at a specific speed.
     * Can be reversed to simulate 'DELETE' instead of 'BACKSPACE'
     * 
     * @param {Object} args - The arguments for deleting lines.
     * @param {number} args.start - The starting line number from which the deletion should begin, inclusive.
     * @param {number} args.end - The ending line number at which the deletion should stop, inclusive.
     * @param {number} [args.speed_ms] - The speed in milliseconds at which the lines should be deleted. If not provided or less than or equal to 0, the lines will be deleted instantly.
     * @param {boolean} [args.reverse] - If true, the lines will be deleted in reverse order.
     * @returns {Promise<void>} A promise that resolves when the lines have been deleted.
     */
    private async delete_lines({ start, end, speed_ms, reverse }: DeleteLinesArgs): Promise<void> {
        // handle speed_ms and reverse inputs
        reverse = reverse || false;
        let instant: boolean = this.debug;
        if (speed_ms === undefined) speed_ms = DEFAULT_SPEED_MS;
        else if (speed_ms <= 0) instant = true;
        if (start > end) {
            const temp: number = start;
            start = end;
            end = temp;
        }

        let base: string = await this.get_current_text();
        
        // TODO: errors?
        const i_start: number = get_index(start, 0, base);
        const i_end: number = get_index(end, 0, base);
        const num_deletions: number = i_end - i_start;

        if (instant) {
            this.delete_text_helper
        } else {
            const i: number = (reverse) ? i_start : i_end;
            return new Promise<void>(async (resolve) => {
                await this.delete_text_helper({i: i, d: num_deletions, speed_ms: speed_ms, reverse: reverse, text: base});
                resolve();
            });
        }
    }

    /**
     * Helper function to animate the deletion of text character by character.
     *
     * @param {number} i - The current index in the base string where the text should be deleted.
     * @param {number} d - The number of characters to delete.
     * @param {number} speed_ms - The speed in milliseconds at which each character should be deleted.
     * @param {boolean} reverse - If true, the text will be deleted in reverse order.
     * @param {string} text - The base string from which the text is being deleted.
     * @returns {Promise<void>} A promise that resolves when the text has been deleted.
     */
    private delete_text_helper({i, d, speed_ms, reverse, text}: DeleteHelperArgs): Promise<void> {
        return new Promise<void>((resolve) => {
            const start_ms: number = Date.now();

            const new_text_code: string | CursorRangeError = delete_text_from_base(i, 1, text, reverse);
            if (typeof new_text_code != "string") {
                if (new_text_code == CursorRangeError.i_too_small) {
                    console.error("ERROR: cursor index i is less than 0");
                    resolve();
                } else if (new_text_code == CursorRangeError.i_too_big) {
                    console.error("Error: cursor index i is greater than the maximum possible position");
                    resolve();
                }
            }

            const new_text: string = new_text_code as string;

            const end_ms: number = Date.now();
            const delay_ms: number = Math.max(0, speed_ms - (end_ms - start_ms));

            setTimeout(async () => {
                this.set_text(new_text);

                if (!reverse) --i;
                --d;

                if (d <= 0) {
                    resolve();
                } else if (this.pause_signal) {
                    this.pause_state = ["delete", { i: i, d: d, speed_ms: speed_ms, reverse: reverse, text: new_text }];
                    resolve();
                } else {
                    await this.delete_text_helper({i: i, d: d, speed_ms: speed_ms, reverse: reverse, text: new_text});
                    resolve();
                }
            }, delay_ms);
        })
    }

    // TODO: docs sleep
    private sleep({ sleep_ms }: SleepArgs): Promise<void> {
        sleep_ms; // TODO: delete

        return new Promise<void>((resolve) => resolve()); // TODO: implement sleep promise
    }
}

// TODO: docs too_many_characters_error_message
// TODO: test too_many_characters_error_message
function too_many_characters_error_message(i: number, text: string, num_deletions: number): string {
    // TODO: improve message with instruction pointer
    // TODO: reverse too
    text;
    return `Tried to illegally delete ${num_deletions} chracters from index: ${i}`;
}

// TODO: test get_index
/**
 * Calculates the index in the base string corresponding to a given row and column.
 *
 * @param {number} row - The row number to find the index for.
 * @param {number} col - The column number to find the index for.
 * @param {string} text - The base string in which the index is to be found.
 * @returns {number} The index in the base string corresponding to the specified row and column.
 * @throws {Error} If the specified row or column is out of bounds.
 */
function get_index(row: number, col: number, text: string): number {
    let i: number = 0;
    let r: number = 0;
    while (i < text.length && r < row) {
        if (text[i] === "\n") ++r;
        ++i;
    }

    if (r < row)
        throw new Error(get_index_row_OOB_error_message(text, r, row));

    let row_start_index: number = i;
    let c: number = 0;
    while (i < text.length && c < col) {
        const char: string = text[i];
        ++c;
        ++i;

        if (char === "\n" && c < col)
            throw new Error(get_index_col_OOB_error_message(row_start_index, row, c, col, text));
    }

    return i;
}

/**
 * Simply generates the error message used inside of get_index
 * on a column OOB error.
 * 
 * [EXAMPLE]:
 *   The text only has row indices [0-4] and you tried acessing row index 5
 *
 *   0: def text_frequency_analyze():
 *   1:     pass
 *   2:     pass
 *   3:     pass
 *   4:     pass
 *
 *   ------------- or -----------------
 *
 *   The text only has row indices [0-13] and you tried acessing row index 17
 *
 *   0: def text_frequency_analyze():
 *   1:     pass
 *       ...
 *   12:     pass
 *   13:     pass
 * 
 * @param text 
 * @param r 
 * @param row 
 * @returns 
 */
function get_index_row_OOB_error_message(text: string, r: number, row: number): string {
    const split_lines: string[] = text.split("\n");
    const tab_padding = 4;
    const padding: number = String(split_lines.length - 1).length + tab_padding;
    let debug_lines: string = "";
    if (r >= 5) {
        debug_lines = 
            `${String(0).padStart(padding, " ")}: ${JSON.stringify(split_lines[0])}
            ${String(1).padStart(padding, " ")}: ${JSON.stringify(split_lines[1])}
            ${" ".repeat(padding + tab_padding + 1)}...
            ${String(split_lines.length - 2).padStart(padding, " ")}: ${JSON.stringify(split_lines[split_lines.length - 2])}
            ${String(split_lines.length - 1).padStart(padding, " ")}: ${JSON.stringify(split_lines[split_lines.length - 1])}`;
    } else {
        debug_lines = split_lines
            .map((line, index) => `${String(index).padStart(padding, " ")}: ${JSON.stringify(line)}`)
            .join("\n");
    }
    
    const error_message: string = 
        `The text only has row indices [0-${split_lines.length - 1}] and you tired accessing row index ${row}
        
        ${debug_lines}`;

    return error_message;
}

/**
 * Simply generates the error message used inside of get_index
 * on a column OOB error.
 * 
 * [EXAMPLE]:
 *   Expected row=9 to be have col_index=13 but only has indices [0, 12]
 *
 *   r: 9 "def hello():\n    p" 
 *                     --
 *                     12
 * 
 * @param row_start_index is the index of the start of the row
 * @param row is the row in question
 * @param actual_col is the current 
 * @param requested_col is the requested
 * @param text 
 * @returns 
 */
function get_index_col_OOB_error_message(row_start_index: number, row: number, actual_col: number, requested_col: number, text: string): string {
    const start = Math.max(row_start_index, actual_col - 15);
    const end = Math.min(actual_col, text.length);
    const string_segment: string = text.slice(start, end);
    const string_segment_unescaped: string = JSON.stringify(string_segment);
    const newline_start: number = string_segment_unescaped.indexOf("\\n");
    const row_string: string = `r: ${row} `;
    const row_padding: number = row_string.length;

    const error_message: string = 
        `Expected row={row} to have col_index=${requested_col} but only has indices [0, ${actual_col}]
        
        ${row_string} ${string_segment_unescaped}
        ${" ".repeat(row_padding + 1 + newline_start)}--
        ${" ".repeat(row_padding + 1 + newline_start)}${actual_col}`;

    return error_message
}

/**
 * Inserts a specified text into a base string at a given index.
 *
 * @param {number} i - The index in the base string where the text should be inserted.
 * @param {string} text - The text to be inserted into the base string.
 * @param {string} base - The base string into which the text is being inserted.
 * @returns {string} A new string with the specified text inserted at the given index in the base string.
 */
function write_text_in_base(i: number, text: string, base: string): string {
    return base.slice(0, i) + text + base.slice(i);
}

/**
 * Deletes a specified number of characters from a given base string starting at a specified index.
 * 
 * @param {number} i - The index in the base string from which the deletion should start.
 * @param {number} num_deletions - The number of characters to delete from the base string.
 * @param {string} base - The base string from which the characters are being deleted.
 * @param {boolean} reverse - If true, simulates 'DEL' key, else simulates 'BACK' key
 * @returns {string | CursorRangerError} A new string with the specified number of characters deleted from the base string.
 */
function delete_text_from_base(i: number, num_deletions: number, base: string, reverse: boolean): string | CursorRangeError {
    if (i < 0) return CursorRangeError.i_too_small;
    else if (i > base.length) return CursorRangeError.i_too_big;

    const start = (!reverse) ? Math.max(0, i - num_deletions) : Math.max(0, i);
    const end = (!reverse) ? Math.min(base.length, i) : Math.min(base.length, i + num_deletions);
    
    return base.slice(0, start) + base.slice(end, base.length);
}