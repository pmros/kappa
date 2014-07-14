/* global expect: true, describe: true, it:  true, beforeEach: true */
define(['../../../src/data/automata'], function(k)
{
    'use strict';

    describe('automata', function()
    {
		it('shoud override toString', function()
		{
			var a = new k.data.Automata({});
			expect(Object.getPrototypeOf(a).hasOwnProperty('toString')).toBe(true);
		});

		describe('constructor', function()
		{
			it('should define a states array if not specified', function()
			{
				var a = new k.data.Automata({});

				expect(a.states).toBeDefined();
				expect(a.states).toBeInstanceOf(Array);
				expect(a.states.length).toBe(0);
			});

			it('should save the states property if specified', function()
			{
				var a = new k.data.Automata({
					states: [{
						getIdentity: function() {return 1; }
					}, {
						getIdentity: function() {return 2; }
					}, {
						getIdentity: function() {return 3; }
					}]
				});

				expect(a.states).toBeDefined();
				expect(a.states).toBeInstanceOf(Array);
				expect(a.states.length).toBe(3);
				expect(a.states[0].getIdentity()).toBe(1);
				expect(a.states[1].getIdentity()).toBe(2);
				expect(a.states[2].getIdentity()).toBe(3);
			});

			it('should save the specified options', function()
			{
				var options = {
						name: 'testing',
						forReal: true
					},
					a = new k.data.Automata(options);

				expect(a.options).toBe(options);
			});
		});

		describe('getNextState', function()
		{
			it('should return null if we retrieve all automata\'s states', function()
			{
				var a = new k.data.Automata({
					states: [{
						getIdentity: function() {return 1; }
					}, {
						getIdentity: function() {return 2; }
					}, {
						getIdentity: function() {return 3; }
					}]
				});

				a.getNextState(); //get 1
				a.getNextState(); //get 2
				a.getNextState(); //get 3

				var result = a.getNextState();
				expect(result).toBe(null);
			});

			it('should return null if there is no state', function()
			{
				var a = new k.data.Automata({});

				expect(a.getNextState()).toBe(null);
			});

			it('shoud return the first state onyl once', function()
			{
				var state1 = {
						getIdentity: function() {return 1; }
					},
					state2 = {
						getIdentity: function() {return 2; }
					},
					state3 = {
						getIdentity: function() {return 3; }
					},
					a = new k.data.Automata({
						states: [state1, state2, state3]
					});

				expect(a.getNextState()).toBe(state1); //get 1
				expect(a.getNextState()).toBe(state2); //get 2
				expect(a.getNextState()).toBe(state3); //get 3

				var result = a.getNextState();
				expect(result).toBe(null);
			});
		});
		
		describe('isValid', function()
		{
		    it('should return false if there is one invalid state', function()
			{
				var a = new k.data.Automata({
					states: [
						{
							getIdentity: function() {
								return '1';
							},
							isValid: function ()
							{
								return false;
							}
						},
						{
							getIdentity: function() {
								return '2';
							},
							isValid: function ()
							{
								return true;
							}
						},
						{
							getIdentity: function() {
								return '3';
							},
							isValid: function ()
							{
								return true;
							}
						}
					]
				});

				expect(a.isValid()).toBe(false);
			});
			
			it('should return false if all states are invalid', function ()
			{
				var a = new k.data.Automata({
					states: [
						{
							getIdentity: function() {
								return '1';
							},
							isValid: function ()
							{
								return false;
							}
						},
						{
							getIdentity: function() {
								return '2';
							},
							isValid: function ()
							{
								return false;
							}
						},
						{
							getIdentity: function() {
								return '3';
							},
							isValid: function ()
							{
								return false;
							}
						}
					]
				});

				expect(a.isValid()).toBe(false);
			});
			
			it('should return TRUE if the automata has no states', function ()
			{
				var a = new k.data.Automata({});
				expect(a.isValid()).toBe(true);
			});
			
			it('should return true if all states are valid', function()
			{
			    var a = new k.data.Automata({
					states: [
						{
							getIdentity: function() {
								return '1';
							},
							isValid: function ()
							{
								return true;
							}
						},
						{
							getIdentity: function() {
								return '2';
							},
							isValid: function ()
							{
								return true;
							}
						},
						{
							getIdentity: function() {
								return '3';
							},
							isValid: function ()
							{
								return true;
							}
						}
					]
				});

				expect(a.isValid()).toBe(true);
			});
		});
		
		describe('initialStateAccessor', function()
		{
		    it('should set the initial state if it is passed', function()
		    {
		        var a = new k.data.Automata({}),
		        	expectedResult = {
						mock:true
					};
					
				a.initialStateAccessor(expectedResult);
				expect(a.initialStateAccessor()).toBe(expectedResult);
		    });
		    
		    it('should return the initial state if nothing is passed', function()
		    {
		        var expectedResult = {
						mock:true
					},
					a = new k.data.Automata({initialState: expectedResult});
		        	
				expect(a.initialStateAccessor()).toBe(expectedResult);
		    });
		});

		describe('addState', function()
		{
			it('should throw an exception if the state is invalid', function()
			{
				var a = new k.data.Automata({});

				expect(function() { return a.addState({}); }).toThrow();
			});

			it('should add the specified state', function()
			{
				var a = new k.data.Automata({});

				a.addState({
					getIdentity: function() {return 1; }
				});

				expect(a.getNextState().getIdentity()).toBe(1);
			});

			it('should add only once each state', function()
			{
				var a = new k.data.Automata({});

				a.addState({
					getIdentity: function() {return 1; }
				});

				a.addState({
					getIdentity: function() {return 1; }
				});

				expect(a.getNextState().getIdentity()).toBe(1);
				expect(a.getNextState()).toBe(null);
			});
		});
    });

});