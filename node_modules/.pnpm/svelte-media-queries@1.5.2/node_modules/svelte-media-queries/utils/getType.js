import { Types } from "../components/MediaQuery.types";
export const getType = (value) => {
    if (Array.isArray(value)) {
        return Types.array;
    }
    else if (value instanceof Object) {
        return Types.object;
    }
    return Types.string;
};
