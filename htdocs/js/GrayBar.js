var graybar = function (options) {
	var that = {};

	that.options = options || null;

	that.settings = {
		name: 'Gray Bar',
		developer: '',
		width: 320,
		height: 480,
		tile: 16,
		imgDir: '../img',
		cssDir: '../css'
	};

	that.init = function () {
		var settings = that.settings;
		if (that.options) {
			settings = that.merge(settings, that.options);
		}
	};

	that.isArray = Array.isArray || function( obj ) {
		return that.type(obj) === "array";
	};

	that.isFunction = function( obj ) {
		return that.type(obj) === "function";
	};

	that.isPlainObject = function( obj ) {
		// Must be an Object.
		// Because of IE, have to check presence of the constructor property.
		// Make sure DOM nodes and window objects don't pass through, as well
		if ( !obj || that.type(obj) !== "object" || obj.nodeType || that.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
			!hasOwn.call(obj, "constructor") &&
			!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	};

	// A crude way of determining if an object is a window
	that.isWindow = function( obj ) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	};

	that.merge = function () {
		var options, name, src, copy, copyIsArray, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;

		// If a deep copy situation
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// If target is string or something (possible in deep copy)
		if (typeof target !== "object" && !that.isFunction(target)) {
			target = {};
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( that.isPlainObject(copy) || (copyIsArray = that.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && that.isArray(src) ? src : [];

						} else {
							clone = src && that.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = that.merge( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	that.type = function (obj) {
		return obj == null ?
			String(obj) :
			class2type[ toString.call(obj) ] || "object";
	};

	return that;
},

// Save a reference to some core methods
toString = Object.prototype.toString,
hasOwn = Object.prototype.hasOwnProperty,
push = Array.prototype.push,
slice = Array.prototype.slice,
trim = String.prototype.trim,
indexOf = Array.prototype.indexOf,
class2type = {};