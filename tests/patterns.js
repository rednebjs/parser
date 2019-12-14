import { readFileSync } from 'fs';
import { expect } from 'chai';
import Parser from '../src/index.js';

const patterns = Parser.patterns;
const path = 'tests/fixtures/patterns.md';
const text = readFileSync( path ).toString();

describe( 'patterns', () => {
	it( 'is an object', () => {
		expect( patterns ).to.be.an( 'object' );
	} );
	it( 'has all keys: heading, orderedList, unorderedList, inlineCode, procedure, expected', () => {
		const keys = [ 'heading', 'orderedList', 'unorderedList', 'inlineCode', 'procedure', 'expected' ];
		expect( patterns ).to.have.all.keys( keys );
	} );

	describe( 'patterns.heading', () => {
		it( 'is a RegExp', () => {
			expect( patterns.heading ).to.be.an.instanceof( RegExp );
		} );
		it( 'does not match string started with # if it is not in new line', () => {
			const found = text.match( patterns.heading );
			expect( found ).not.to.include.members( [ '# It is not header' ] );
		} );
		it( 'does not match string started with # if there is no space', () => {
			const found = text.match( patterns.heading );
			expect( found ).not.to.include.members( [ '#gfsg' ] );
		} );
		it( 'matches properly headings from the text', () => {
			const found = text.match( patterns.heading );
			const expectedHeadings = [ '# Header.', '# Meow' ];
			expect( found ).to.deep.equal( expectedHeadings );
		} );
	} );

	describe( 'patterns.orderedList', () => {
		it( 'is a RegExp', () => {
			expect( patterns.orderedList ).to.be.an.instanceof( RegExp );
		} );
		it( 'matches ordered list items', () => {
			const expectedOrderedListItems = [ '1. Bla bla #gfsg', '2. bla bla bla `miau()`' ];
			const found = text.match( patterns.orderedList );
			expect( found ).to.deep.equal( expectedOrderedListItems );
		} );
		it( 'does not match unordered list items', () => {
			const found = text.match( patterns.orderedList );
			expect( found ).not.to.include.members( [ '* It is unordered list item', '- Another unordered list' ] );
		} );
	} );

	describe( 'patterns.unorderedList', () => {
		it( 'is a RegExp', () => {
			expect( patterns.unorderedList ).to.be.an.instanceof( RegExp );
		} );
		it( 'matches unordered list items started with *', () => {
			const found = text.match( patterns.unorderedList );
			expect( found ).to.include.members( [ '* It is unordered list item', '* It is another unordered list item' ] );
		} );
		it( 'matches unordered list items started with -', () => {
			const found = text.match( patterns.unorderedList );
			expect( found ).to.include.members( [ '- Another unordered list', '- Another cat from unordered list # It is not header' ] );
		} );
		it( 'does not match ordered list items', () => {
			const found = text.match( patterns.unorderedList );
			expect( found ).not.to.include.members( [ '1. Bla bla #gfsg', '2. bla bla bla `miau()`' ] );
		} );
	} );

	describe( 'patterns.inlineCode', () => {
		it( 'is a RegExp', () => {
			expect( patterns.inlineCode ).to.be.an.instanceof( RegExp );
		} );
		it( 'matches inline code properly', () => {
			const expectedInlineCode = [ '`miau()`' ];
			const found = text.match( patterns.inlineCode );
			expect( found ).to.deep.equal( expectedInlineCode );
		} );

	} );

	describe( 'patterns.procedure', () => {
		it( 'is a RegExp', () => {
			expect( patterns.procedure ).to.be.an.instanceof( RegExp );
		} );
		it( 'does not match **Expeted:** marker', () => {
			const found = text.match( patterns.procedure );
			expect( found ).not.to.include.members( [ '**Expected:**\nThis is expected paragraph.' ] );
		} );
		it( 'matches **Procedure:** marker', () => {
			const found = text.match( patterns.procedure );
			expect( found ).to.deep.equal( [ '**Procedure:**\nThis is procedure paragraph. It make sth special.' ] );
		} );
	} );

	describe( 'patterns.expected', () => {
		it( 'is a RegExp', () => {
			expect( patterns.expected ).to.be.an.instanceof( RegExp );
		} );
		it( 'does not match **Procedure:** marker', () => {
			const found = text.match( patterns.expected );
			expect( found ).not.to.include.members( [ '**Procedure:**\nThis is procedure paragraph. It make sth special.' ] );
		} );
		it( 'matches **Expected:** marker', () => {
			const found = text.match( patterns.expected );
			expect( found ).to.deep.equal( [ '**Expected:**\nThis is expected paragraph.' ] );
		} );
	} );
} );
