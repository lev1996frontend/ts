start:
	input $n 
  goto allow if $n >= 18 
  goto deny

allow: 
	print "Вы совершеннолетний"
	goto end

deny: 
  print "Вы несовершеннолетний"

end:
