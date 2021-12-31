<template>
	<div>
		<base-dialog title="Error" :show="!!error" @close="error = null">
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<base-card>
				<header>
					<h2>Requests Received</h2>
				</header>
				<div v-if="!isLoading">
					<ul v-if="hasRequests">
						<request-item
							v-for="request in requests"
							:key="request.id"
							:email="request.userEmail"
							:message="request.message"
						></request-item>
					</ul>
					<h3 v-else>You haven't received any requests yet.</h3>
				</div>
				<base-spinner v-else></base-spinner>
			</base-card>
		</section>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RequestItem from '../components/requests/RequestItem.vue';

export default {
	components: {
		RequestItem,
	},
	data() {
		return {
			isLoading: false,
			error: null,
		};
	},
	async created() {
		this.isLoading = true;
		try {
			await this.fetchRequests();
		} catch (error) {
			this.error = error.message || 'Something failed';
		}
		this.isLoading = false;
	},
	computed: {
		...mapGetters('requests', ['requests', 'hasRequests']),
	},
	methods: {
		...mapActions('requests', ['fetchRequests']),
	},
};
</script>

<style scoped>
header {
	text-align: center;
}

ul {
	list-style: none;
	margin: 2rem auto;
	padding: 0;
	max-width: 30rem;
}

h3 {
	text-align: center;
}
</style>