'use strict';
const Parser = require( '../dist/parser.js' );
const Patterns = Parser.Patterns;
const chai = require( 'chai' );
const expect = chai.expect;
const readFileSync = require( 'fs' ).readFileSync;
const path = 'tests/fixtures/patterns.md';
const text = readFileSync( path ).toString();

describe( 'Patterns', () => {
	it( 'is an object', () => {
		expect( Patterns ).to.be.an( 'object' );
	} );
	it( 'has all keys: heading, orderedList, unorderedList, inlineCode, procedure, expectied', () => {
		expect( Patterns ).to.have.all.keys( 'heading', 'orderedList', 'unorderedList', 'inlineCode', 'procedure', 'expected' );
	} );

	describe( 'Patterns.heading', () => {
		const found = text.match( Patterns.heading );
		it( 'is a RegExp', () => {
			expect( Patterns.heading ).to.be.a( 'RegExp' );
		} );
		it( 'not to match string started with # if it is not in new line', () => {
			expect( found ).not.to.include.members( [ '# It is not header' ] );
		} );
		it( 'not to match string started with # if there is no space', () => {
			expect( found ).not.to.include.members( [ '#gfsg' ] );
		} );
		it( 'matches properly headings from the text', () => {
			const expectedHeadings = [ '# Header.', '# Meow' ];
			expect( found ).to.eql( expectedHeadings );
		} );
	} );

	describe( 'Patterns.orderedList', () => {
		const found = text.match( Patterns.orderedList );
		it( 'is a RegExp', () => {
			expect( Patterns.orderedList ).to.be.a( 'RegExp' );
		} );
		it( 'matches ordered list items', () => {
			const expectedOrderedListItems = [ '1. Bla bla #gfsg', '2. bla bla bla `miau()`' ];
			expect( found ).to.eql( expectedOrderedListItems );
		} );
		it( 'not to match unordered list items', () => {
			expect( found ).not.to.include.members( [ '* It is unordered list item', '- Another unordered list' ] );
		} );
	} );

	describe( 'Patterns.unorderedList', () => {
		const found = text.match( Patterns.unorderedList );
		it( 'is a RegExp', () => {
			expect( Patterns.unorderedList ).to.be.a( 'RegExp' );
		} );
		it( 'matches unordered list items started with *', () => {
			expect( found ).to.include.members( [ '* It is unordered list item', '* It is another unordered list item' ] );
		} );
		it( 'matches unordered list items started with -', () => {
			expect( found ).to.include.members( [ '- Another unordered list', '- Another cat from unordered list # It is not header' ] );
		} );
		it( 'not to match ordered list items', () => {
			expect( found ).not.to.include.members( [ '1. Bla bla #gfsg', '2. bla bla bla `miau()`' ] );
		} );
	} );

	describe( 'Patterns.inlineCode', () => {
		const found = text.match( Patterns.inlineCode );
		it( 'is a RegExp', () => {
			expect( Patterns.inlineCode ).to.be.a( 'RegExp' );
		} );
		it( 'matches inline code properly', () => {
			const exptectedInlineCode = [ '`miau()`' ];
			expect( found ).to.eql( exptectedInlineCode );
		} );

	} );

	describe( 'Patterns.procedure', () => {
		const found = text.match( Patterns.procedure );
		it( 'is a RegExp', () => {
			expect( Patterns.procedure ).to.be.a( 'RegExp' );
		} );
		it( 'not to match **Expeted:** marker', () => {
			expect( found ).not.to.include.members( [ '**Expected:**\nThis is expected paragraph.' ] );
		} );
		it( 'matches **Procedure:** marker', () => {
			expect( found ).to.eql( [ '**Procedure:**\nThis is procedure paragraph. It make sth special.' ] );
		} );
	} );

	describe( 'Patterns.expected', () => {
		const found = text.match( Patterns.expected );
		it( 'is a RegExp', () => {
			expect( Patterns.expected ).to.be.a( 'RegExp' );
		} );
		it( 'not to match **Procedure:** marker', () => {
			expect( found ).not.to.include.members( [ '**Procedure:**\nThis is procedure paragraph. It make sth special.' ] );
		} );
		it( 'matches **Expected:** marker', () => {
			expect( found ).to.eql( [ '**Expected:**\nThis is expected paragraph.' ] );
		} );
	} );
} );
