/**
 * fromArray()
 *
 * Generates a Merkle Tree from an array with the arguments passed in. The
 * array cannot be empty. It can contain either values to be hashed, or an 
 * actual list of hashes.
 *
 * @param {object} args An object containing the arguments to construct 
 *                      the Tree. See the README for more info.
 * @param {callback} cb An object containing the Merkle Tree. See 
 *                      the README for more info.
 *
 */
 function fromArray(args, cb) {
    
    var array;
    var hashalgo;
    var hashlist;

    if (!args.array || args.array.length === 0) {
        cb('An array with at least 1 element is required', null);

    } else {
        array = args.array;
        
        if (!args.hashalgo) {
            hashalgo = 'sha256';    // Set the default hash as SHA-256
        } else {
            hashalgo = args.hashalgo;
        }

        if (!args.hashlist) {
            hashlist = false;       // Assume the elements aren't hashes
        } else {
            hashlist = args.hashlist;
        }

        // Import dependencies
        var HashArray = require('./lib/hash-array');
        var genMerkle = require('./lib/merkle-gen');

        var arrayHasher = new HashArray(hashalgo, hashlist);

        arrayHasher.hashElements(array, function (fastMap) {
            
            // Generate a Merkle Tree from the leaves
            genMerkle(fastMap, hashalgo, function (tree) {
                cb(null, tree);
            });
        });
    }
}


// Export the fromArray() and fromFile() functions
module.exports = {
    fromArray: fromArray,
}

