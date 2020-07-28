export let indentation = '';

export function indent(callback, amount = '  ') {
	var old = indentation;
	indentation += amount;
	var result = callback();
	indentation = old;
	return result;
}
