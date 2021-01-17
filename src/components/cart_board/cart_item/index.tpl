<tr>
	<td>
		<input type="checkbox" class="checkbox" data-cartid="{{ cartId }}" checked />
	</td>
	<td>
		<span>{{ cartId }}</span>
	</td>
	<td>
		<a href="{{ link }}" target="_blank">
			<img src="{{ img }}" alt="{{ name }}" />
		</a>
	</td>
	<td>
		<a href="{{ link }}" target="_blank">{{ name }}</a>
	</td>
	<td>
		<span class="price">￥{{ price }}.00</span>
	</td>
	<td>
		<span>{{ version }}</span>
	</td>
	<td>
		<span>{{ color }}</span>
	</td>
	<td>
		<button class="purchase-btn" data-cartid="{{ cartId }}">结算</button>
	</td>
	<td>
		<a href="javascript:;" class="remove-btn" data-cartid="{{ cartId }}">删除</a>
	</td>
</tr>