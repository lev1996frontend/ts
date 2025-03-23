$sum = 0

loop_start:
	input $next_number
	goto loop_end if $next_number = 0
	$sum += $next_number
	goto loop_start

loop_end: 
	print $sum
	print "программа завершена"
