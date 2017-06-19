const patterns = {
	heading: /^#\s.+$/mg,
	orderedList: /^\d\.\s.+/mg,
	unorderedList: /^(\*|-)\s.*/mg,
	inlineCode: /`.+`/mg,
	procedure: /\*{2}Procedure:\*{2}\n^.+/mg,
	expected: /\*{2}Expected:\*{2}\n^.+/mg
};

export default patterns;
