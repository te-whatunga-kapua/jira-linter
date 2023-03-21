import {expect, test} from '@jest/globals'


// shows how the runner will run a javascript action with env / stdout protocol
test('it runs', () => {
  expect(2 + 2).toBe(4)
})