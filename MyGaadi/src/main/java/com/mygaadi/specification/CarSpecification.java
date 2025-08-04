package com.mygaadi.specification;

import com.mygaadi.dto.CarFilterDTO;
import com.mygaadi.entities.Car;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class CarSpecification {
    public static Specification<Car> filterBy(CarFilterDTO f) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (f.getBrand() != null && !f.getBrand().isBlank()) {
                predicates.add(cb.equal(cb.lower(root.get("brand")), f.getBrand().toLowerCase()));
            }
            if (f.getLocation() != null && !f.getLocation().isBlank()) {
                predicates.add(cb.equal(cb.lower(root.get("location")), f.getLocation().toLowerCase()));
            }
            if (f.getMinYear() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("registrationYear"), f.getMinYear()));
            }
            if (f.getMaxYear() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("registrationYear"), f.getMaxYear()));
            }
            if (f.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), f.getMinPrice()));
            }
            if (f.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), f.getMaxPrice()));
            }
            // add more if needed...
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
