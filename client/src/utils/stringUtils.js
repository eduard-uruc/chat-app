import upperFirst from 'lodash/upperFirst';
import toLower from 'lodash/toLower';
import _ from 'lodash';

export const capitalizeFirstLetter = (string) => {
    return upperFirst(toLower(string));
};

export const getAcronym = (name) => {
    return _.chain(name)
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpper()
        .value();
};