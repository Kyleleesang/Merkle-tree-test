// This module hashes the elements in an array and returns a FastMap of the hashes

var hasha = require('hasha');
var FastMap = require('collections/fast-map');

var hashAlgorithm;
var hashlist;
var fastMap;

/**
 * Initialize the HashArray construtor
 *
 * @param {string} hA The hash function to be used
 * @param {boolean} hL True if the array contains hashes, and false if
 *                      and false by default (just a regular array)
 *
 */
function HashArray(hA = 'sha256', hL = false) {
    hashAlgorithm = hA;
    hashlist = hL;
}

/**
 * Hashes each of the elements in an array
 *
 * @param {array} array The array containing all the elements to hash
 * @param {callback} cb The callback containing the populated fastMap
 *
 */
HashArray.prototype.hashElements = function hashElements(array, cb) {

    fastMap = new FastMap();
        // Iterate over each of the elements
        array.forEach(function (value, index) {

            // If they are not a 'string', turn them into one. JSON.stringify()
            // is used because toString() does not turn objects into strings
            if (typeof value !== 'string') {
                value = JSON.stringify(value);
            }

            // Hash the value and add it to the fastMap
            fastMap.add(hasha(value, {algorithm: hashAlgorithm}), index);
        });
    }

    // Return the fastMap
    cb(fastMap);

// Export the the HashArray function
module.exports = HashArray;