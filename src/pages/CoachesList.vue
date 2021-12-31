<template>
	<div>
		<base-dialog title="Error" :show="!!error" @close="error = null">
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<filter-coaches @change-filter="setFilters"></filter-coaches>
		</section>
		<section>
			<base-card>
				<div class="controls">
					<base-button
						mode="outline"
						@click="loadCoaches({ forceRefresh: true })"
						>Refresh</base-button
					>
					<base-button to="/register" v-if="!userIsCoach && !isLoading"
						>Register as Coach</base-button
					>
				</div>
				<div v-if="isLoading">
					<base-spinner></base-spinner>
				</div>
				<div v-else>
					<ul v-if="hasCoaches && filteredCoaches.length > 0">
						<coach-item
							v-for="coach in filteredCoaches"
							:key="coach.id"
							:id="coach.id"
							:firstName="coach.firstName"
							:lastName="coach.lastName"
							:rate="coach.hourlyRate"
							:areas="coach.areas"
						></coach-item>
					</ul>
					<h3 v-else>No coaches found.</h3>
				</div>
			</base-card>
		</section>
	</div>
</template>

<script>
import CoachItem from '../components/coachList/CoachItem.vue';
import FilterCoaches from '../components/coachList/FilterCoaches.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
	components: {
		CoachItem,
		FilterCoaches,
	},
	async created() {
		this.isLoading = true;
		try {
			await this.loadCoaches({ forceRefresh: false });
		} catch (error) {
			this.error = error.message || 'Something went wrong';
		}

		this.isLoading = false;
	},
	data() {
		return {
			activeFilters: {
				frontend: true,
				backend: true,
				career: true,
			},
			isLoading: false,
			error: null,
		};
	},
	computed: {
		...mapGetters('coaches', ['coaches', 'hasCoaches', 'userIsCoach']),
		filteredCoaches() {
			return this.coaches.filter((coach) => {
				if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
					return true;
				} else if (
					this.activeFilters.backend &&
					coach.areas.includes('backend')
				) {
					return true;
				} else if (
					this.activeFilters.career &&
					coach.areas.includes('career')
				) {
					return true;
				} else {
					return false;
				}
			});
		},
	},
	methods: {
		...mapActions('coaches', ['loadCoaches']),
		setFilters(updatedFilters) {
			this.activeFilters = updatedFilters;
		},
	},
};
</script>

<style scoped>
ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.controls {
	display: flex;
	justify-content: space-between;
}
</style>