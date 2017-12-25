/**
 * Created by Ondřej Kratochvíl on 21.12.17.
 */
class InputSanitizer {

    static sanitize(input) {
        return !input ? null : input
            .split(" ").join("+")
            .split("ě").join("e")
            .split("č").join("c");
    }
}

module.exports = InputSanitizer;
