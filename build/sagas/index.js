// Generated by CoffeeScript 1.10.0
var ADD_TODO_STATE, Async, LOAD_TODO_STATE, MODIFY_TODO_STATE, REMOVE_TODO_STATE, TODO_CREATE, TODO_CREATE_ERROR, TODO_CREATE_START, TODO_CREATE_SUCCESS, TODO_DELETE, TODO_DELETE_ERROR, TODO_DELETE_START, TODO_DELETE_SUCCESS, TODO_FETCH, TODO_FETCH_ERROR, TODO_FETCH_START, TODO_FETCH_SUCCESS, TODO_UPDATE, TODO_UPDATE_ERROR, TODO_UPDATE_START, TODO_UPDATE_SUCCESS, Types, assign, call, constants, dd, dispatch, echo, ref, rootSaga, saga, sagaEffects, services, takeEvery;

echo = console.log;

dd = require('ddeyes');

assign = Object.assign;

ref = require('cfx.redux-saga'), saga = ref.saga, sagaEffects = ref.sagaEffects, dispatch = ref.dispatch;

takeEvery = require('redux-saga').takeEvery;

call = sagaEffects.call;

constants = require('../constants/index');

Types = constants.types;

services = require('../services/index');

TODO_FETCH = Types.TODO_FETCH, TODO_FETCH_START = Types.TODO_FETCH_START, TODO_FETCH_SUCCESS = Types.TODO_FETCH_SUCCESS, TODO_FETCH_ERROR = Types.TODO_FETCH_ERROR, LOAD_TODO_STATE = Types.LOAD_TODO_STATE, TODO_CREATE = Types.TODO_CREATE, TODO_CREATE_START = Types.TODO_CREATE_START, TODO_CREATE_SUCCESS = Types.TODO_CREATE_SUCCESS, TODO_CREATE_ERROR = Types.TODO_CREATE_ERROR, ADD_TODO_STATE = Types.ADD_TODO_STATE, TODO_UPDATE = Types.TODO_UPDATE, TODO_UPDATE_START = Types.TODO_UPDATE_START, TODO_UPDATE_SUCCESS = Types.TODO_UPDATE_SUCCESS, TODO_UPDATE_ERROR = Types.TODO_UPDATE_ERROR, MODIFY_TODO_STATE = Types.MODIFY_TODO_STATE, TODO_DELETE = Types.TODO_DELETE, TODO_DELETE_START = Types.TODO_DELETE_START, TODO_DELETE_SUCCESS = Types.TODO_DELETE_SUCCESS, TODO_DELETE_ERROR = Types.TODO_DELETE_ERROR, REMOVE_TODO_STATE = Types.REMOVE_TODO_STATE;

Async = {
  fetch: function*(action) {
    var error, ex, newAction, todos;
    (yield dispatch(action, TODO_FETCH_START));
    try {
      todos = (yield call(services.fetch));
    } catch (error) {
      ex = error;
      (yield dispatch(action, TODO_FETCH_ERROR));
      throw new Error(ex);
    }
    if (!todos) {
      return;
    }
    newAction = assign({}, action, {
      payload: assign(action.payload, {
        todos: todos
      })
    });
    (yield dispatch(newAction, TODO_FETCH_SUCCESS));
    (yield dispatch(newAction, LOAD_TODO_STATE));
  },
  create: function*(action) {
    var error, ex, todoIndex;
    (yield dispatch(action, TODO_CREATE_START));
    try {
      todoIndex = (yield call(services.create, action.payload.todo));
    } catch (error) {
      ex = error;
      (yield dispatch(action, TODO_CREATE_ERROR));
      throw new Error(ex);
    }
    if (!todoIndex) {
      return;
    }
    (yield dispatch(action, TODO_CREATE_SUCCESS));
    (yield dispatch(action, ADD_TODO_STATE));
  },
  update: function*(action) {
    var error, ex, todo;
    (yield dispatch(action, TODO_UPDATE_START));
    try {
      todo = (yield call(services.update, action.payload.todo));
    } catch (error) {
      ex = error;
      (yield dispatch(action, TODO_UPDATE_ERROR));
      throw new Error(ex);
    }
    if (!todo) {
      return;
    }
    (yield dispatch(action, TODO_UPDATE_SUCCESS));
    (yield dispatch(action, MODIFY_TODO_STATE));
  },
  "delete": function*(action) {
    var error, ex;
    (yield dispatch(action, TODO_DELETE_START));
    try {
      (yield call(services["delete"], action.payload.todoId));
    } catch (error) {
      ex = error;
      (yield dispatch(action, TODO_DELETE_ERROR));
      throw new Error(ex);
    }
    (yield dispatch(action, TODO_DELETE_SUCCESS));
    (yield dispatch(action, REMOVE_TODO_STATE));
  }
};

rootSaga = [
  function*() {
    return (yield* takeEvery(TODO_FETCH, Async.fetch));
  }, function*() {
    return (yield* takeEvery(TODO_CREATE, Async.create));
  }, function*() {
    return (yield* takeEvery(TODO_UPDATE, Async.update));
  }, function*() {
    return (yield* takeEvery(TODO_DELETE, Async["delete"]));
  }
];

module.exports = rootSaga;