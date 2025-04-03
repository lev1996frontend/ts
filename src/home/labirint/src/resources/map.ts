import { MazeMap } from "../maze/MazeMap";


export const map = new MazeMap([
	[ // 1.1
		{	top: true, bottom: false, left: true, right: false },
		// 1.2
		{	top: true, bottom: true, left: false, right: false },
		// 1.3
		{	top: true, bottom: false, left: false, right: true },
		// 1.4
		{	top: true, bottom: false, left: true, right: false },
		// 1.5
		{	top: true, bottom: false, left: false, right: false },
		// 1.6
		{	top: true, bottom: true, left: false, right: false },
		// 1.7
		{	top: true, bottom: true, left: false, right: false },
		// 1.8
		{	top: true, bottom: true, left: false, right: true },
		// 1.9
		{	top: true, bottom: false, left: true, right: false },
		// 1.10
		{	top: true, bottom: false, left: false, right: true },
	],
	// 2
	[ // 2.1
		{	top: false, bottom: true, left: true, right: false },
		// 2.2
		{	top: true, bottom: true, left: false, right: true },
		// 2.3
		{	top: false, bottom: false, left: true, right: true },
		// 2.4
		{	top: false, bottom: false, left: true, right: true },
		// 2.5
		{	top: false, bottom: true, left: true, right: false },
		// 2.6
		{	top: true, bottom: true, left: false, right: false },
		// 2.7
		{	top: true, bottom: true, left: false, right: false },
		// 2.8
		{	top: true, bottom: false, left: false, right: true },
		// 2.9
		{	top: false, bottom: false, left: true, right: true },
		// 2.10
		{	top: false, bottom: false, left: true, right: true },
	],
	// 3
	[ // 3.1
		{	top: true, bottom: false, left: true, right: true, key: 1},
		// 3.2
		{	top: true, bottom: false, left: true, right: false },
		// 3.3
		{	top: false, bottom: true, left: false, right: true },
		// 3.4
		{	top: false, bottom: true, left: true, right: false },
		// 3.5
		{	top: true, bottom: true, left: false, right: false },
		// 3.6
		{	top: true, bottom: false, left: false, right: true },
		// 3.7
		{	top: true, bottom: false, left: true, right: true },
		// 3.8
		{	top: false, bottom: false, left: true, right: true },
		// 3.9
		{	top: false, bottom: false, left: true, right: true },
		// 3.10
		{	top: false, bottom: false, left: true, right: true },
	],
	// 4
	[ // 4.1
		{	top: false, bottom: false, left: true, right: true },
		// 4.2
		{	top: false, bottom: true, left: true, right: false },
		// 4.3
		{	top: true, bottom: true, left: false, right: false },
		// 4.4
		{	top: true, bottom: false, left: false, right: true },
		// 4.5
		{	top: true, bottom: false, left: true, right: false },
		// 4.6
		{	top: false, bottom: true, left: false, right: false },
		// 4.7
		{	top: false, bottom: false, left: false, right: true },
		// 4.8
		{	top: false, bottom: false, left: true, right: false },
		// 4.9
		{	top: false, bottom: true, left: false, right: true },
		// 4.10
		{	top: false, bottom: false, left: true, right: true },
	],
	// 5
	[ // 5.1
		{	top: false, bottom: true, left: true, right: false },
		// 5.2
		{	top: true, bottom: false, left: false, right: false },
		// 5.3
		{	top: false, bottom: false, left: true, right: false },
		// 5.4
		{	top: false, bottom: true, left: true, right: false },
		// 5.5
		{	top: false, bottom: true, left: false, right: true },
		// 5.6
		{	top: true, bottom: false, left: true, right: false },
		// 5.7
		{	top: false, bottom: true, left: false, right: true },
		// 5.8
		{	top: false, bottom: true, left: true, right: false },
		// 5.9
		{	top: true, bottom: true, left: false, right: true },
		// 5.10
		{	top: false, bottom: false, left: true, right: true },
	],
	// 6
	[ // 6.1
		{	top: true, bottom: false, left: true, right: true },
		// 6.2
		{	top: false, bottom: true, left: true, right: false },
		// 6.3
		{	top: true, bottom: true, left: false, right: false },
		// 6.4
		{	top: true, bottom: true, left: false, right: false },
		// 6.5
		{	top: true, bottom: false, left: false, right: false },
		// 6.6
		{	top: false, bottom: true, left: false, right: true },
		// 6.7
		{	top: true, bottom: false, left: true, right: true },
		// 6.8
		{	top: true, bottom: false, left: true, right: false },
		// 6.9
		{	top: true, bottom: false, left: false, right: true },
		// 6.10
		{	top: false, bottom: false, left: true, right: 2 },
	],
	// 7
	[ // 7.1
		{	top: false, bottom: true, left: true, right: false },
		// 7.2
		{	top: true, bottom: true, left: false, right: false },
		// 7.3
		{	top: true, bottom: false, left: false, right: false },
		// 7.4
		{	top: true, bottom: true, left: false, right: true },
		// 7.5
		{	top: false, bottom: false, left: true, right: true },
		// 7.6
		{	top: true, bottom: false, left: true, right: false },
		// 7.7
		{	top: false, bottom: true, left: false, right: false },
		// 7.8
		{	top: false, bottom: false, left: false, right: true },
		// 7.9
		{	top: false, bottom: true, left: true, right: false },
		// 7.10
		{	top: false, bottom: true, left: false, right: true },
	],
	// 8
	[ // 8.1
		{	top: true, bottom: false, left: true, right: false },
		// 8.2
		{	top: true, bottom: true, left: false, right: false },
		// 8.3
		{	top: false, bottom: true, left: false, right: false },
		// 8.4
		{	top: true, bottom: true, left: false, right: false },
		// 8.5
		{	top: false, bottom: true, left: false, right: true },
		// 8.6
		{	top: false, bottom: false, left: true, right: false },
		// 8.7
		{	top: true, bottom: false, left: false, right: true },
		// 8.8
		{	top: false, bottom: false, left: true, right: true },
		// 8.9
		{	top: true, bottom: true, left: true, right: false },
		// 8.10
		{	top: true, bottom: false, left: false, right: true },
	],
	// 9
	[ // 9.1
		{	top: false, bottom: true, left: true, right: true },
		// 9.2
		{	top: true, bottom: false, left: true, right: false },
		// 9.3
		{	top: true, bottom: true, left: false, right: false },
		// 9.4
		{	top: true, bottom: false, left: false, right: false },
		// 9.5
		{	top: true, bottom: false, left: false, right: true },
		// 9.6
		{	top: false, bottom: false, left: true, right: true },
		// 9.7
		{	top: false, bottom: false, left: true, right: true },
		// 9.8
		{	top: false, bottom: true, left: true, right: false },
		// 9.9
		{	top: true, bottom: true, left: false, right: false },
		// 9.10
		{	top: false, bottom: true, left: false, right: true },
	],
	// 10
	[ // 10.1
		{	top: true, bottom: true, left: false, right: false },
		// 10.2
		{	top: false, bottom: true, left: false, right: true },
		// 10.3
		{	top: true, bottom: true, left: true, right: false },
		// 10.4
		{	top: false, bottom: true, left: false, right: true },
		// 10.5
		{	top: false, bottom: true, left: true, right: false },
		// 10.6
		{	top: false, bottom: true, left: false, right: true },
		// 10.7
		{	top: false, bottom: true, left: true, right: false },
		// 10.8
		{	top: true, bottom: true, left: false, right: false },
		// 10.9
		{	top: true, bottom: true, left: false, right: 1 },
		// 10.10
		{	top: true, bottom: true, left: 1, right: true, key: 2	},
	],
], {
	start: { row: 10, column: 0 },
	finish: {	row: 6, column: 11 },
})