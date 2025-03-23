; TODO
; В скрипте example.txt нужно добавить обработку неправильного ввода: нельзя вводить отрицательные числа

; goto finish
start:
    input $n       ; задаем значение n
    $result = 1    ; переменная для хранения результата

    goto negative if $n < 0 
    goto loop_end if $n = 0 

loop_start:
    goto loop_end if $n = 0  ; завершаем цикл, когда n равно 0
    $result *= $n            ; умножаем result на текущее значение n
    $n -= 1                  ; уменьшаем n на 1
    goto loop_start          ; переходим к метке

loop_end:
    print $result               ; выводим результат

finish:
  	print "программа завершена"
    goto end

negative:
    print "невозможно посчитать факториал отрицательного числа"

end: 
